"use strict";(self.webpackChunkhardware_client=self.webpackChunkhardware_client||[]).push([[543],{1543:(E,l,e)=>{e.r(l),e.d(l,{FindSessionsModule:()=>o});var c=e(6895),h=e(433),a=e(5127),m=e(7579),p=e(2722),u=e(4650),Z=e(7252),g=e(7556);function A(n,t){if(1&n){const s=u.EpF();u.TgZ(0,"tr")(1,"th",6),u._uU(2),u.qZA(),u.TgZ(3,"td"),u._uU(4),u.ALo(5,"date"),u.qZA(),u.TgZ(6,"td"),u._uU(7),u.ALo(8,"date"),u.qZA(),u.TgZ(9,"td"),u._uU(10),u.qZA(),u.TgZ(11,"td"),u._uU(12),u.qZA(),u.TgZ(13,"td"),u._uU(14),u.qZA(),u.TgZ(15,"td")(16,"button",7),u.NdJ("click",function(){const f=u.CHM(s).$implicit,S=u.oxw();return u.KtG(S.connectToSession(f.id))}),u._uU(17,"\u041f\u043e\u0434\u043a\u043b\u044e\u0447\u0438\u0442\u044c\u0441\u044f"),u.qZA()()()}if(2&n){const s=t.$implicit,r=t.index;u.xp6(2),u.Oqu(r+1),u.xp6(2),u.Oqu(u.xi3(5,10,s.begin,"dd.MM.YYYY HH:mm")),u.xp6(3),u.hij(" ",u.xi3(8,13,s.end,"dd.MM.YYYY HH:mm"),""),u.xp6(3),u.lnq(" ",null==s.creator?null:s.creator.first_name," ",null==s.creator?null:s.creator.last_name," ",null==s.creator?null:s.creator.patronymic,""),u.xp6(2),u.lnq(" ",null==s.user?null:s.user.first_name," ",null==s.user?null:s.user.last_name," ",null==s.user?null:s.user.patronymic,""),u.xp6(2),u.hij(" ",null==s.equipment?null:s.equipment.name,"")}}class i{constructor(t,s,r){this.sessionService=t,this.authService=s,this.router=r,this.sessions=[],this.sourceSessions=[],this.onDestroy$=new m.x}ngOnDestroy(){this.onDestroy$.next(!0),this.onDestroy$.complete()}getSessions(){this.sessionService.getNearestAndStarted().pipe((0,p.R)(this.onDestroy$)).subscribe(t=>{this.sessions=t,this.sourceSessions=t})}connectToSession(t){this.router.navigate(["waiting-room",t])}ngOnInit(){this.getSessions()}filterByCreatorCurrentUser(t){this.sessions=t.target.checked?this.sourceSessions.filter(s=>s.creator?.id===this.authService.currentUser?.id):this.sourceSessions}}i.\u0275fac=function(t){return new(t||i)(u.Y36(Z.m),u.Y36(g.e),u.Y36(a.F0))},i.\u0275cmp=u.Xpm({type:i,selectors:[["app-find-sessions"]],decls:25,vars:1,consts:[["type","checkbox",3,"change"],[1,"table-responsive"],[1,"table"],["scope","col"],[1,"highlight_tr_hover"],[4,"ngFor","ngForOf"],["scope","row"],["type","button",1,"btn","btn-secondary",3,"click"]],template:function(t,s){1&t&&(u.TgZ(0,"div")(1,"input",0),u.NdJ("change",function(d){return s.filterByCreatorCurrentUser(d)}),u.qZA(),u._uU(2," \u041e\u0442\u043e\u0431\u0440\u0430\u0437\u0438\u0442\u044c \u0442\u043e\u043b\u044c\u043a\u043e \u0441\u043e\u0437\u0434\u0430\u043d\u043d\u044b\u0435 \u043c\u043d\u043e\u0439 \u0441\u0435\u0441\u0441\u0438\u0438\n"),u.qZA(),u.TgZ(3,"div",1)(4,"table",2)(5,"caption")(6,"b"),u._uU(7,"\u0417\u0430\u043f\u0443\u0449\u0435\u043d\u043d\u044b\u0435 \u0438 \u0431\u043b\u0438\u0436\u0430\u0439\u0448\u0438\u0435 \u0441\u0435\u0430\u043d\u0441\u044b(\u0441\u0435\u0430\u043d\u0441\u044b \u0434\u043e \u043d\u0430\u0447\u0430\u043b\u0430 \u043a\u043e\u0442\u043e\u0440\u044b\u0445 \u043e\u0441\u0442\u0430\u043b\u043e\u0441\u044c \u043c\u0435\u043d\u044c\u0448\u0435 10 \u043c\u0438\u043d\u0443\u0442)"),u.qZA()(),u.TgZ(8,"thead")(9,"tr")(10,"th",3),u._uU(11,"#"),u.qZA(),u.TgZ(12,"th",3),u._uU(13,"\u041d\u0430\u0447\u0430\u043b\u043e"),u.qZA(),u.TgZ(14,"th",3),u._uU(15,"\u041a\u043e\u043d\u0435\u0446"),u.qZA(),u.TgZ(16,"th",3),u._uU(17,"\u0421\u043e\u0437\u0434\u0430\u0442\u0435\u043b\u044c \u0441\u0435\u0441\u0441\u0438\u0438"),u.qZA(),u.TgZ(18,"th",3),u._uU(19,"\u041a\u043e\u043c\u0443 \u043d\u0430\u0437\u043d\u0430\u0447\u0435\u043d\u043e"),u.qZA(),u.TgZ(20,"th",3),u._uU(21,"\u041e\u0431\u043e\u0440\u0443\u0434\u043e\u0432\u0430\u043d\u0438\u0435"),u.qZA(),u._UZ(22,"th",3),u.qZA()(),u.TgZ(23,"tbody",4),u.YNc(24,A,18,16,"tr",5),u.qZA()()()),2&t&&(u.xp6(24),u.Q6J("ngForOf",s.sessions))},dependencies:[c.sg,c.uU]});const C=[{path:"",component:i}];class o{}o.\u0275fac=function(t){return new(t||o)},o.\u0275mod=u.oAB({type:o}),o.\u0275inj=u.cJS({imports:[c.ez,h.u5,a.Bz.forChild(C)]})}}]);