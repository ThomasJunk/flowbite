import { writable } from "svelte/store";
import type { DocModel } from "./CSAFWebview/docmodel/docmodeltypes";

type AppStore = {
  webview: {
    doc: DocModel | null;
    providerMetadata: any;
    currentFeed: any;
    ui: {
      docToggleExpandAll: boolean;
      feedErrorMsg: string;
      loading: boolean;
      singleErrorMsg: string;
      isGeneralSectionVisible: boolean;
      isRevisionHistoryVisible: boolean;
      isVulnerabilitiesOverviewVisible: boolean;
      isVulnerabilitiesSectionVisible: boolean;
      isProductTreeOpen: boolean;
      isProductTreeVisible: boolean;
      isFeedSectionOpen: boolean;
      selectedCVE: string;
      selectedProduct: string;
      uploadedFile: boolean;
      history: string[];
    };
  };
};

const generateInitialState = (): AppStore => {
  const state: AppStore = {
    webview: {
      doc: null,
      providerMetadata: null,
      currentFeed: null,
      ui: {
        docToggleExpandAll: false,
        feedErrorMsg: "",
        loading: false,
        singleErrorMsg: "",
        isGeneralSectionVisible: true,
        isRevisionHistoryVisible: false,
        isVulnerabilitiesOverviewVisible: true,
        isVulnerabilitiesSectionVisible: false,
        isProductTreeOpen: false,
        isProductTreeVisible: false,
        isFeedSectionOpen: false,
        selectedCVE: "",
        selectedProduct: "",
        uploadedFile: false,
        history: []
      }
    }
  };
  return state;
};

function createStore() {
  const { subscribe, set, update } = writable(generateInitialState());

  return {
    subscribe,
    toggleDocExpandAll: () => {
      update((settings) => {
        if (settings.webview.ui.docToggleExpandAll) {
          settings.webview.ui.docToggleExpandAll = false;
        } else {
          settings.webview.ui.docToggleExpandAll = true;
        }
        return settings;
      });
    },
    setFeedSectionOpen: () => {
      update((settings) => {
        settings.webview.ui.isFeedSectionOpen = true;
        return settings;
      });
    },
    setFeedSectionClosed: () => {
      update((settings) => {
        settings.webview.ui.isFeedSectionOpen = false;
        return settings;
      });
    },
    setLoading: (option: boolean) => {
      update((settings) => {
        settings.webview.ui.loading = option;
        return settings;
      });
    },
    setSingleErrorMsg: (msg: string) => {
      update((settings) => {
        settings.webview.ui.singleErrorMsg = msg;
        return settings;
      });
    },
    setFeedErrorMsg: (msg: string) => {
      update((settings) => {
        settings.webview.ui.feedErrorMsg = msg;
        return settings;
      });
    },
    setDocument: (data: any) =>
      update((settings) => {
        settings.webview.doc = data;
        return settings;
      }),
    setSelectedCVE: (cve: string) => {
      update((settings) => {
        settings.webview.ui.selectedCVE = cve;
        return settings;
      });
    },
    resetSelectedCVE: () => {
      update((settings) => {
        settings.webview.ui.selectedCVE = "";
        return settings;
      });
    },
    setSelectedProduct: (product: string) => {
      update((settings) => {
        settings.webview.ui.selectedProduct = product;
        return settings;
      });
    },
    resetSelectedProduct: () => {
      update((settings) => {
        settings.webview.ui.selectedProduct = "";
        return settings;
      });
    },
    setGeneralSectionVisible: () => {
      update((settings) => {
        settings.webview.ui.isGeneralSectionVisible = true;
        return settings;
      });
    },
    setGeneralSectionInvisible: () => {
      update((settings) => {
        settings.webview.ui.isGeneralSectionVisible = false;
        return settings;
      });
    },
    setVulnerabilitiesSectionVisible: () => {
      update((settings) => {
        settings.webview.ui.isVulnerabilitiesSectionVisible = true;
        return settings;
      });
    },
    setVulnerabilitiesSectionInvisible: () => {
      update((settings) => {
        settings.webview.ui.isVulnerabilitiesSectionVisible = false;
        return settings;
      });
    },
    setVulnerabilitiesOverviewVisible: () => {
      update((settings) => {
        settings.webview.ui.isVulnerabilitiesOverviewVisible = true;
        return settings;
      });
    },
    setVulnerabilitiesOverviewInvisible: () => {
      update((settings) => {
        settings.webview.ui.isVulnerabilitiesOverviewVisible = false;
        return settings;
      });
    },
    setProductTreeOpen: () => {
      update((settings) => {
        settings.webview.ui.isProductTreeOpen = true;
        return settings;
      });
    },
    setProductTreeClosed: () => {
      update((settings) => {
        settings.webview.ui.isProductTreeOpen = false;
        return settings;
      });
    },
    setProductTreeSectionVisible: () => {
      update((settings) => {
        settings.webview.ui.isProductTreeVisible = true;
        return settings;
      });
    },
    setProductTreeSectionInVisible: () => {
      update((settings) => {
        settings.webview.ui.isProductTreeVisible = false;
        return settings;
      });
    },
    setUploadedFile: () => {
      update((settings) => {
        settings.webview.ui.uploadedFile = true;
        return settings;
      });
    },
    clearUploadedFile: () => {
      update((settings) => {
        settings.webview.ui.uploadedFile = false;
        return settings;
      });
    },
    clearHistory: () => {
      update((settings) => {
        settings.webview.ui.history = [];
        return settings;
      });
    },
    unshiftHistory: (id: string) => {
      update((settings) => {
        settings.webview.ui.history.unshift(id);
        return settings;
      });
    },
    shiftHistory: () => {
      update((settings) => {
        if (settings.webview.ui.history.length > 0) {
          settings.webview.ui.history.shift();
        }
        return settings;
      });
    },
    reset: () => set(generateInitialState())
  };
}

export const appStore = createStore();
