<!--
 This file is Free Software under the MIT License
 without warranty, see README.md and LICENSES/MIT.txt for details.

 SPDX-License-Identifier: MIT

 SPDX-FileCopyrightText: 2023 German Federal Office for Information Security (BSI) <https://www.bsi.bund.de>
 Software-Engineering: 2023 Intevation GmbH <https://intevation.de>
-->
<script lang="ts">
  import { appStore } from "$lib/store";
  import { Status, TLP } from "$lib/CSAFWebview/docmodel/docmodeltypes";
  import Acknowledgments from "$lib/CSAFWebview/acknowledgments/Acknowledgments.svelte";
  import Collapsible from "$lib/CSAFWebview/Collapsible.svelte";
  import Notes from "$lib/CSAFWebview/notes/Notes.svelte";
  import References from "$lib/CSAFWebview/references/References.svelte";
  import RevisionHistory from "./RevisionHistory.svelte";
  import ValueList from "$lib/CSAFWebview/ValueList.svelte";
  let tlpStyle = "";
  $: aliases = $appStore.webview.doc?.aliases;
  $: trackingVersion = $appStore.webview.doc?.trackingVersion;
  $: generator = $appStore.webview.doc?.generator;
  $: publisherName = $appStore.webview.doc?.publisher.name;
  $: publisherCategory = $appStore.webview.doc?.publisher.category;
  $: publisherNamespace = $appStore.webview.doc?.publisher.namespace;
  $: publisherIssuingAuthority = $appStore.webview.doc?.publisher.issuing_authority;
  $: publisherContactDetails = $appStore.webview.doc?.publisher.contact_details;
  $: category = $appStore.webview.doc?.category;
  $: title = $appStore.webview.doc?.title;
  $: lang = $appStore.webview.doc?.lang;
  $: sourceLang = $appStore.webview.doc?.sourceLang;
  $: csafVersion = $appStore.webview.doc?.csafVersion;
  $: tlp = $appStore.webview.doc?.tlp;
  $: tlpurl = $appStore.webview.doc?.tlp.url;
  $: if (tlp?.label === TLP.WHITE) {
    tlpStyle = "tlpclear";
  } else if (tlp?.label === TLP.RED) {
    tlpStyle = "tlred";
  } else if (tlp?.label === TLP.AMBER) {
    tlpStyle = "tlamber";
  } else if (tlp?.label === TLP.GREEN) {
    tlpStyle = "tlgreen";
  }
  $: id = $appStore.webview.doc?.id;
  $: published = $appStore.webview.doc?.published;
  $: lastUpdate = $appStore.webview.doc?.lastUpdate;
  $: status = $appStore.webview.doc?.status;
  $: if (
    !$appStore.webview.doc?.isRevisionHistoryPresent &&
    !$appStore.webview.doc?.isDocPresent &&
    !$appStore.webview.doc?.isProductTreePresent &&
    !$appStore.webview.doc?.isPublisherPresent &&
    !$appStore.webview.doc?.isTLPPresent &&
    !$appStore.webview.doc?.isTrackingPresent &&
    !$appStore.webview.doc?.isVulnerabilitiesPresent
  ) {
    appStore.setSingleErrorMsg("Are you sure the URL refers to a CSAF document?");
  }
</script>

<div>
  <table>
    <tr>
      <td>ID</td>
      <td>{id}</td>
    </tr>
    <tr>
      <td>CSAF-Version</td>
      <td>{csafVersion}</td>
    </tr>
    {#if $appStore.webview.doc?.aggregateSeverity}
      <tr>
        <td>Aggregate severity text</td>
        <td><span>{$appStore.webview.doc?.aggregateSeverity.text}</span></td>
      </tr>
      {#if $appStore.webview.doc?.aggregateSeverity.namespace}
        <tr>
          <td>Aggregate severity namespace</td>
          <td><span>{$appStore.webview.doc?.aggregateSeverity.namespace}</span></td>
        </tr>
      {/if}
    {/if}
    {#if tlp?.label}
      <tr>
        <td>TLP</td>
        <td><span class={tlpStyle}>{tlp?.label}</span></td>
      </tr>
    {/if}
    {#if tlp?.url}
      <tr>
        <td>TLP URL</td>
        <td><a href={tlpurl}>{tlp?.url}</a></td>
      </tr>
    {/if}
    <tr>
      <td>Category</td>
      <td>{category}</td>
    </tr>
    <tr>
      <td>Title</td>
      <td>{title}</td>
    </tr>
    <tr>
      <td>Publisher name</td>
      <td>{publisherName}</td>
    </tr>
    <tr>
      <td>Publisher category</td>
      <td>{publisherCategory}</td>
    </tr>
    <tr>
      <td>Publisher namespace</td>
      <td>{publisherNamespace}</td>
    </tr>
    {#if publisherIssuingAuthority}
      <tr>
        <td>Publisher issuing authority</td>
        <td>{publisherIssuingAuthority}</td>
      </tr>
    {/if}
    {#if publisherContactDetails}
      <tr>
        <td>Publisher contact details</td>
        <td>{publisherContactDetails}</td>
      </tr>
    {/if}
    {#if lang}
      <tr>
        <td>Language</td>
        <td>{lang}</td>
      </tr>
    {/if}
    {#if sourceLang}
      <tr>
        <td>Source lang</td>
        <td>{sourceLang}</td>
      </tr>
    {/if}
    <tr>
      <td>Published</td>
      <td>{published}</td>
    </tr>
    <tr>
      <td>Last update</td>
      <td>{lastUpdate}</td>
    </tr>
    <tr>
      <td>Tracking Version</td>
      <td>{trackingVersion}</td>
    </tr>
    {#if $appStore.webview.doc?.status !== Status.final}
      <tr>
        <td>Status</td>
        <td>{status}</td>
      </tr>
    {/if}
    {#if generator}
      <tr>
        <td>Generator engine</td>
        <td><span>{$appStore.webview.doc?.generator?.engine.name}</span></td>
      </tr>
    {/if}
    {#if generator?.engine?.version}
      <tr>
        <td>Generator engine version</td>
        <td><span>{$appStore.webview.doc?.generator?.engine.version}</span></td>
      </tr>
    {/if}
    {#if generator?.date}
      <tr>
        <td>Generator date</td>
        <td><span>{generator?.date}</span></td>
      </tr>
    {/if}
  </table>
</div>

{#if aliases}
  <ValueList label="Aliases" values={aliases} />
{/if}

{#if $appStore.webview.doc?.isRevisionHistoryPresent}
  <div>
    <Collapsible
      header="Revision history"
      level="3"
      open={$appStore.webview.ui.isRevisionHistoryVisible}
    >
      <RevisionHistory />
    </Collapsible>
  </div>
{/if}

{#if $appStore.webview.doc?.notes}
  <div>
    <Collapsible header="Notes" level="3">
      <Notes notes={$appStore.webview.doc?.notes} />
    </Collapsible>
  </div>
{/if}

{#if $appStore.webview.doc?.acknowledgements}
  <div>
    <Collapsible header="Acknowledgements" level="3">
      <Acknowledgments acknowledgements={$appStore.webview.doc?.acknowledgements} />
    </Collapsible>
  </div>
{/if}

{#if $appStore.webview.doc && $appStore.webview.doc.references.length > 0}
  <div>
    <Collapsible header="References" level="3">
      <References references={$appStore.webview.doc?.references} />
    </Collapsible>
  </div>
{/if}
