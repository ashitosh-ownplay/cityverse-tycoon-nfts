import{a1 as u,a5 as m,ae as p,a8 as d,a6 as l,af as w,ag as g}from"./index-Cr9pYv76.js";import{InjectedConnector as f}from"./thirdweb-dev-wallets-evm-connectors-injected.browser.esm-mNo2_Dzs.js";class A extends f{constructor(t){const n={...{name:"MetaMask",shimDisconnect:!0,shimChainChangedDisconnect:!0,getProvider:g},...t.options};super({chains:t.chains,options:n,connectorStorage:t.connectorStorage}),u(this,"id",m.metamask),this._UNSTABLE_shimOnConnectSelectAccount=n.UNSTABLE_shimOnConnectSelectAccount}async connect(){var c,n;let t=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};try{const e=await this.getProvider();if(!e)throw new p;this.setupListeners(),this.emit("message",{type:"connecting"});let s=null;if(this._UNSTABLE_shimOnConnectSelectAccount&&((c=this.options)!=null&&c.shimDisconnect)&&!this.connectorStorage.getItem(this.shimDisconnectKey)&&(s=await this.getAccount().catch(()=>null),!!s))try{await e.request({method:"wallet_requestPermissions",params:[{eth_accounts:{}}]})}catch(h){if(this.isUserRejectedRequestError(h))throw new d(h)}if(!s){const i=await e.request({method:"eth_requestAccounts"});s=l(i[0])}let o=await this.getChainId(),r=this.isChainUnsupported(o);if(t.chainId&&o!==t.chainId)try{await this.switchChain(t.chainId),o=t.chainId,r=this.isChainUnsupported(t.chainId)}catch(i){console.error(`Could not switch to chain id : ${t.chainId}`,i)}(n=this.options)!=null&&n.shimDisconnect&&await this.connectorStorage.setItem(this.shimDisconnectKey,"true");const a={chain:{id:o,unsupported:r},provider:e,account:s};return this.emit("connect",a),a}catch(e){throw this.isUserRejectedRequestError(e)?new d(e):e.code===-32002?new w(e):e}}async switchAccount(){await(await this.getProvider()).request({method:"wallet_requestPermissions",params:[{eth_accounts:{}}]})}}export{A as MetaMaskConnector};
