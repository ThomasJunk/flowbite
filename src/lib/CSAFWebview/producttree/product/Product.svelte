<!--
 This file is Free Software under the MIT License
 without warranty, see README.md and LICENSES/MIT.txt for details.

 SPDX-License-Identifier: MIT

 SPDX-FileCopyrightText: 2023 German Federal Office for Information Security (BSI) <https://www.bsi.bund.de>
 Software-Engineering: 2023 Intevation GmbH <https://intevation.de>
-->

<script lang="ts">
  import { appStore } from "$lib/store";
  import { tick } from "svelte";
  import Collapsible from "$lib/CSAFWebview/Collapsible.svelte";
  import KeyValue from "$lib/CSAFWebview/KeyValue.svelte";
  import ProductIdentificationHelper from "./ProductIdentificationHelper.svelte";
  import type { FullProductName } from "$lib/types";
  export let product: FullProductName;
  let highlight = false;
  /**
   * updateUI waits for the UI to settle and scrolls to given ProductID.
   */
  async function updateUI() {
    await tick();
    document.getElementById(`${product?.product_id}`)?.scrollIntoView({ behavior: "smooth" });
  }
  $: if ($appStore.webview.ui.selectedProduct === product?.product_id) {
    highlight = true;
    updateUI();
  } else {
    highlight = false;
  }
</script>

<Collapsible
  header={product.name}
  level="4"
  {highlight}
  open={$appStore.webview.ui.selectedProduct === product.product_id}
  onClose={() => {
    if ($appStore.webview.ui.selectedProduct === product.product_id) {
      appStore.resetSelectedProduct();
    }
  }}
>
  <div id={product.product_id}>
    <KeyValue keys={["Product ID"]} values={[product.name, product.product_id]} />
    {#if product.product_identification_helper}
      <ProductIdentificationHelper helper={product.product_identification_helper} />
    {/if}
  </div>
</Collapsible>
