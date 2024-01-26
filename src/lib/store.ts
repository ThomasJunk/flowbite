// This file is Free Software under the MIT License
// without warranty, see README.md and LICENSES/MIT.txt for details.
//
// SPDX-License-Identifier: MIT
//
// SPDX-FileCopyrightText: 2023 German Federal Office for Information Security (BSI) <https://www.bsi.bund.de>
// Software-Engineering: 2023 Intevation GmbH <https://intevation.de>

import { writable } from "svelte/store";
import type { DocModel } from "./singleview/docmodel/docmodeltypes";

type AppStore = {
  doc: DocModel | null;
  ui: {
    docToggleExpandAll: boolean;
    loading: boolean;
    singleErrorMsg: string;
    isGeneralSectionVisible: boolean;
    isRevisionHistoryVisible: boolean;
    isVulnerabilitiesOverviewVisible: boolean;
    isVulnerabilitiesSectionVisible: boolean;
    isProductTreeOpen: boolean;
    isProductTreeVisible: boolean;
    selectedCVE: string;
    selectedProduct: string;
  };
};

const generateInitialState = (): AppStore => {
  const state: AppStore = {
    doc: null,
    ui: {
      docToggleExpandAll: false,
      loading: false,
      singleErrorMsg: "",
      isGeneralSectionVisible: true,
      isRevisionHistoryVisible: false,
      isVulnerabilitiesOverviewVisible: true,
      isVulnerabilitiesSectionVisible: false,
      isProductTreeOpen: false,
      isProductTreeVisible: false,
      selectedCVE: "",
      selectedProduct: ""
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
        if (settings.ui.docToggleExpandAll) {
          settings.ui.docToggleExpandAll = false;
        } else {
          settings.ui.docToggleExpandAll = true;
        }
        return settings;
      });
    },
    setLoading: (option: boolean) => {
      update((settings) => {
        settings.ui.loading = option;
        return settings;
      });
    },
    setSingleErrorMsg: (msg: string) => {
      update((settings) => {
        settings.ui.singleErrorMsg = msg;
        return settings;
      });
    },
    setDocument: (data: any) =>
      update((settings) => {
        settings.doc = data;
        return settings;
      }),
    setSelectedCVE: (cve: string) => {
      update((settings) => {
        settings.ui.selectedCVE = cve;
        return settings;
      });
    },
    resetSelectedCVE: () => {
      update((settings) => {
        settings.ui.selectedCVE = "";
        return settings;
      });
    },
    setSelectedProduct: (product: string) => {
      update((settings) => {
        settings.ui.selectedProduct = product;
        return settings;
      });
    },
    resetSelectedProduct: () => {
      update((settings) => {
        settings.ui.selectedProduct = "";
        return settings;
      });
    },
    setGeneralSectionVisible: () => {
      update((settings) => {
        settings.ui.isGeneralSectionVisible = true;
        return settings;
      });
    },
    setGeneralSectionInvisible: () => {
      update((settings) => {
        settings.ui.isGeneralSectionVisible = false;
        return settings;
      });
    },
    setVulnerabilitiesSectionVisible: () => {
      update((settings) => {
        settings.ui.isVulnerabilitiesSectionVisible = true;
        return settings;
      });
    },
    setVulnerabilitiesSectionInvisible: () => {
      update((settings) => {
        settings.ui.isVulnerabilitiesSectionVisible = false;
        return settings;
      });
    },
    setVulnerabilitiesOverviewVisible: () => {
      update((settings) => {
        settings.ui.isVulnerabilitiesOverviewVisible = true;
        return settings;
      });
    },
    setVulnerabilitiesOverviewInvisible: () => {
      update((settings) => {
        settings.ui.isVulnerabilitiesOverviewVisible = false;
        return settings;
      });
    },
    setProductTreeOpen: () => {
      update((settings) => {
        settings.ui.isProductTreeOpen = true;
        return settings;
      });
    },
    setProductTreeClosed: () => {
      update((settings) => {
        settings.ui.isProductTreeOpen = false;
        return settings;
      });
    },
    setProductTreeSectionVisible: () => {
      update((settings) => {
        settings.ui.isProductTreeVisible = true;
        return settings;
      });
    },
    setProductTreeSectionInVisible: () => {
      update((settings) => {
        settings.ui.isProductTreeVisible = false;
        return settings;
      });
    },
    reset: () => set(generateInitialState())
  };
}

export const appStore = createStore();
