<!--
 This file is Free Software under the MIT License
 without warranty, see README.md and LICENSES/MIT.txt for details.

 SPDX-License-Identifier: MIT

 SPDX-FileCopyrightText: 2023 German Federal Office for Information Security (BSI) <https://www.bsi.bund.de>
 Software-Engineering: 2023 Intevation GmbH <https://intevation.de>
-->

<script lang="ts">
  import { appStore } from "$lib/store";
</script>

{#if $appStore.webview.doc?.isRevisionHistoryPresent}
  <div>
    <table>
      <thead>
        <tr
          ><th>Date</th>
          <th>Number</th>
          <th>Summary</th>
          <th>Legacy_version</th>
        </tr>
      </thead>
      <tbody>
        {#each $appStore.webview.doc?.revisionHistory as entry}
          <tr>
            <td>{entry.date}</td><td>{entry.number}</td><td>{entry.summary}</td><td
              >{#if entry.legacyVersion}{entry.legacyVersion}{/if}</td
            >
          </tr>
        {/each}
      </tbody>
    </table>
  </div>
{/if}
