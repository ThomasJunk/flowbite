<!--
 This file is Free Software under the MIT License
 without warranty, see README.md and LICENSES/MIT.txt for details.

 SPDX-License-Identifier: MIT

 SPDX-FileCopyrightText: 2023 German Federal Office for Information Security (BSI) <https://www.bsi.bund.de>
 Software-Engineering: 2023 Intevation GmbH <https://intevation.de>
-->

<script lang="ts">
  import KeyValue from "$lib/CSAFWebview/KeyValue.svelte";
  import type { Note } from "$lib/CSAFWebview/docmodel/docmodeltypes";
  import { marked } from "marked";
  import DOMPurify from "dompurify";
  marked.use({ gfm: true });
  export let note: Note;
  let keys: string[] = [];
  let values: string[] = [];
  if (note.audience) {
    keys.push("Audience");
    values.push(note.audience);
  }
  if (note.title) {
    keys.push("Title");
    values.push(note.title);
  }
</script>

<KeyValue {keys} {values} />
<div>
  <h5>Text</h5>
</div>

<div class="markdown-text">
  <div class="display-markdown">
    {@html DOMPurify.sanitize(
      marked.parse(note.text.replace(/^[\u200B\u200C\u200D\u200E\u200F\uFEFF]/, ""))
    )}
  </div>
</div>

<style>
  .markdown-text {
    margin-left: 1rem;
    padding: 0.5rem;
    border: 1px solid lightgray;
    width: 100%;
    overflow-x: auto;
    position: relative;
  }
  .display-markdown {
  }
</style>
