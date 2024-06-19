import{a1 as u,a5 as p,ae as l,a8 as d,a6 as m,af as w,bd as f}from"./index-Cr9pYv76.js";import{InjectedConnector as g}from"./thirdweb-dev-wallets-evm-connectors-injected.browser.esm-mNo2_Dzs.js";class q extends g{constructor(e){const s={...{name:"OneKey Wallet",shimDisconnect:!0,shimChainChangedDisconnect:!0,getProvider:f},...e.options};super({chains:e.chains,options:s,connectorStorage:e.connectorStorage}),u(this,"id",p.oneKey)}async connect(){var r,s;let e=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};try{const t=await this.getProvider();if(!t)throw new l;this.setupListeners(),this.emit("message",{type:"connecting"});let n=null;if((r=this.options)!=null&&r.shimDisconnect&&!this.connectorStorage.getItem(this.shimDisconnectKey)&&(n=await this.getAccount().catch(()=>null),!!n))try{await t.request({method:"wallet_requestPermissions",params:[{eth_accounts:{}}]})}catch(h){if(this.isUserRejectedRequestError(h))throw new d(h)}if(!n){const i=await t.request({method:"eth_requestAccounts"});n=m(i[0])}let o=await this.getChainId(),c=this.isChainUnsupported(o);if(e.chainId&&o!==e.chainId)try{await this.switchChain(e.chainId),o=e.chainId,c=this.isChainUnsupported(e.chainId)}catch(i){console.error(`Could not switch to chain id : ${e.chainId}`,i)}(s=this.options)!=null&&s.shimDisconnect&&await this.connectorStorage.setItem(this.shimDisconnectKey,"true");const a={chain:{id:o,unsupported:c},provider:t,account:n};return this.emit("connect",a),a}catch(t){throw this.isUserRejectedRequestError(t)?new d(t):t.code===-32002?new w(t):t}}}export{q as OneKeyConnector};
