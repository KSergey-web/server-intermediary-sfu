"use strict";(self.webpackChunkhardware_client=self.webpackChunkhardware_client||[]).push([[592],{4111:(u,c,e)=>{e.d(c,{r:()=>t});var o=e(4004),p=e(4364),a=e(4650),l=e(529);class t{constructor(r,n){this.apiUrl=r,this.http=n}getUsersByGroup(r){const n=this.apiUrl+`/v1/api/ldap/group/${r.replace(" ","")}/users`;return console.log(n),this.http.get(n).pipe((0,o.U)(_=>_.users))}addUsersToSubgroup(r,n){return this.http.patch(this.apiUrl+`/v1/api/strapi/subgroups/${r}/users`,{users:n}).pipe((0,o.U)(i=>i.users))}}t.\u0275fac=function(r){return new(r||t)(a.LFG(p.PV),a.LFG(l.eN))},t.\u0275prov=a.Yz7({token:t,factory:t.\u0275fac})},2276:(u,c,e)=>{e.d(c,{C:()=>a});var o=e(6895),p=e(4650);class a{constructor(t){this.locale=t}getInterval(t,s){return(0,o.p6)(t,"dd.MM.YYYY",this.locale)+" - "+(0,o.p6)(s,"dd.MM.YYYY",this.locale)}getDate(t){return(0,o.p6)(t,"dd.MM.YYYY",this.locale)}getMonth(t){return(0,o.p6)(t,"MM.YYYY",this.locale)}getIntervalMonths(t,s){return(0,o.p6)(t,"MMMM YYYY",this.locale)+" \u0433. - "+(0,o.p6)(s,"MMMM YYYY",this.locale)+" \u0433."}getIntervalMonthsShort(t,s){return(0,o.p6)(t,"MM.YYYY",this.locale)+" \u0433. - "+(0,o.p6)(s,"MM.YYYY",this.locale)+" \u0433."}getFormattedDateTime(t,s="dd.MM.YYYY HH:mm:ss"){return(0,o.p6)(t,s,this.locale)}}a.\u0275fac=function(t){return new(t||a)(p.LFG(p.soG))},a.\u0275prov=p.Yz7({token:a,factory:a.\u0275fac,providedIn:"root"})},6798:(u,c,e)=>{e.d(c,{Q:()=>t});var o=e(4004),p=e(4364),a=e(4650),l=e(529);class t{constructor(r,n){this.apiUrl=r,this.http=n}getEquipments(){return this.http.get(`${this.apiUrl}/api/equipments`).pipe((0,o.U)(r=>{const n=[];return r.data.forEach(_=>{n.push({id:_.id,name:_.attributes.name})}),n}))}}t.\u0275fac=function(r){return new(r||t)(a.LFG(p.T5),a.LFG(l.eN))},t.\u0275prov=a.Yz7({token:t,factory:t.\u0275fac,providedIn:"root"})}}]);