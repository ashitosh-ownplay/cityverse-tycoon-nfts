import{a0 as h,a1 as d,a2 as e,a3 as c}from"./index-Cr9pYv76.js";class p extends h{constructor(i){super(),d(this,"onChainChanged",t=>{const n=c(t),o=!this.options.chains.find(a=>a.chainId===n);this.emit("change",{chain:{id:n,unsupported:o}})}),this.options=i}async connect(i){return i.chainId&&this.switchChain(i.chainId),await(await this.getSigner()).getAddress()}async disconnect(){this._provider=void 0,this._signer=void 0}async getAddress(){const i=await this.getSigner();if(!i)throw new Error("No signer found");return await i.getAddress()}async isConnected(){try{return!!await this.getAddress()}catch{return!1}}async getProvider(){return this._provider||(this._provider=e(this.options.chain,{clientId:this.options.clientId,secretKey:this.options.secretKey})),this._provider}async getSigner(){if(!this._signer){const i=await this.getProvider();this._signer=r(this.options.signer,i)}return this._signer}async switchChain(i){const t=this.options.chains.find(n=>n.chainId===i);if(!t)throw new Error(`Chain not found for chainId ${i}, please add it to the chains property when creating this wallet`);this._provider=e(t,{clientId:this.options.clientId,secretKey:this.options.secretKey}),this._signer=r(this.options.signer,this._provider),this.onChainChanged(i)}async setupListeners(){}updateChains(i){this.options.chains=i}}function r(s,i){return i?s.connect(i):s}export{p as SignerConnector};
