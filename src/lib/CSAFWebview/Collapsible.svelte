<!--
 This file is Free Software under the MIT License
 without warranty, see README.md and LICENSES/MIT.txt for details.

 SPDX-License-Identifier: MIT

 SPDX-FileCopyrightText: 2023 German Federal Office for Information Security (BSI) <https://www.bsi.bund.de>
 Software-Engineering: 2023 Intevation GmbH <https://intevation.de>
-->

<script lang="ts">
  import { ChevronRightSolid, ChevronDownSolid } from "flowbite-svelte-icons";
  import { Heading } from "flowbite-svelte";
  export let header: string;
  export let open = false;
  export let level = "2";
  export let class_ = "";
  export let highlight = false;
  const uuid = crypto.randomUUID();
  export let onOpen = () => {
    //default: Do notthing
  };
  export let onClose = () => {
    //default: Do notthing
  };
  let visibility = "none";
  $: if (open) {
    visibility = "block";
  } else {
    visibility = "none";
  }
  let icon = "bx-chevron-down";
  /**
   * toggle toggles visibility of content.
   */
  const toggle = () => {
    if (visibility === "block") {
      onClose();
      visibility = "none";
    } else {
      onOpen();
      setTimeout(() => {
        const element = document.getElementById(`${uuid}`);
        const y = element!.getBoundingClientRect().top + window.scrollY - 150;
        window.scrollTo({ top: y, behavior: "smooth" });
      }, 200);
      visibility = "block";
    }
  };
  $: if (visibility === "block") {
    icon = "bx-chevron-down";
  } else {
    icon = "bx-chevron-right";
  }
</script>

<div class:highlight-section={highlight}>
  <!-- svelte-ignore a11y-click-events-have-key-events -->
  <!-- svelte-ignore a11y-no-static-element-interactions -->
  <div style="display:flex" title={header} id={header} on:click={toggle} class={class_}>
    {#if visibility === "block"}
      <ChevronDownSolid size="lg" />
    {:else}
      <ChevronRightSolid size="lg" />
    {/if}
    <Heading tag={"h" + level}>
      {header}</Heading
    >
  </div>
  {#if visibility === "block"}
    <div id={uuid} class="collapsible-body">
      <slot />
    </div>
  {/if}
</div>
