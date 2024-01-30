<script>
  import Webview from "$lib/CSAFWebview/Webview.svelte";
  import { convertToDocModel } from "$lib/CSAFWebview/docmodel/docmodel";
  import { appStore } from "$lib/store";
  import { doc } from "$lib/testdata";
  const docModel = convertToDocModel(doc);
  appStore.setDocument(docModel);
</script>

<Webview></Webview>
