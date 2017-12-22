var fluid_2_0_0=fluid_2_0_0||{};!function($,fluid){"use strict";fluid.defaults("fluid.viewComponent",{gradeNames:["fluid.modelComponent"],initFunction:"fluid.initView",argumentMap:{container:0,options:1},members:{dom:"@expand:fluid.initDomBinder({that}, {that}.options.selectors)"}}),fluid.dumpSelector=function(selectable){return"string"==typeof selectable?selectable:selectable.selector?selectable.selector:""},fluid.diagnoseFailedView=function(componentName,that,options,args){if(!that&&fluid.hasGrade(options,"fluid.viewComponent")){var container=fluid.wrap(args[1]),message1="Instantiation of view component with type "+componentName+" failed, since ";container?0===container.length?fluid.fail(message1+'selector "',fluid.dumpSelector(args[1]),'" did not match any markup in the document'):fluid.fail(message1+" component creator function did not return a value"):fluid.fail(message1+" container argument is empty")}},fluid.checkTryCatchParameter=function(){var location=window.location||{search:"",protocol:"file:"},GETparams=location.search.slice(1).split("&");return fluid.find(GETparams,function(param){return 0===param.indexOf("notrycatch")?!0:void 0})===!0},fluid.notrycatch=fluid.checkTryCatchParameter(),fluid.wrap=function(obj,userJQuery){return userJQuery=userJQuery||$,!obj||obj.jquery?obj:userJQuery(obj)},fluid.unwrap=function(obj){return obj&&obj.jquery?obj[0]:obj},fluid.container=function(containerSpec,fallible,userJQuery){userJQuery&&(containerSpec=fluid.unwrap(containerSpec));var container=fluid.wrap(containerSpec,userJQuery);if(fallible&&(!container||0===container.length))return null;if(!container||!container.jquery||1!==container.length){"string"!=typeof containerSpec&&(containerSpec=container.selector);var count=void 0!==container.length?container.length:0;fluid.fail((count>1?"More than one ("+count+") container elements were":"No container element was")+" found for selector "+containerSpec)}return fluid.isDOMNode(container[0])||fluid.fail("fluid.container was supplied a non-jQueryable element"),container},fluid.createDomBinder=function(container,selectors){function cacheKey(name,thisContainer){return fluid.allocateSimpleId(thisContainer)+"-"+name}function record(name,thisContainer,result){that.cache[cacheKey(name,thisContainer)]=result}var that={id:fluid.allocateGuid(),cache:{}},userJQuery=container.constructor;return that.locate=function(name,localContainer){var selector,thisContainer,togo;return selector=selectors[name],thisContainer=localContainer?$(localContainer):container,thisContainer||fluid.fail("DOM binder invoked for selector "+name+" without container"),togo=""===selector?thisContainer:selector?"function"==typeof selector?userJQuery(selector.call(null,fluid.unwrap(thisContainer))):userJQuery(selector,thisContainer):userJQuery(),togo.selector||(togo.selector=selector,togo.context=thisContainer),togo.selectorName=name,record(name,thisContainer,togo),togo},that.fastLocate=function(name,localContainer){var thisContainer=localContainer?localContainer:container,key=cacheKey(name,thisContainer),togo=that.cache[key];return togo?togo:that.locate(name,localContainer)},that.clear=function(){that.cache={}},that.refresh=function(names,localContainer){var thisContainer=localContainer?localContainer:container;"string"==typeof names&&(names=[names]),void 0===thisContainer.length&&(thisContainer=[thisContainer]);for(var i=0;i<names.length;++i)for(var j=0;j<thisContainer.length;++j)that.locate(names[i],thisContainer[j])},that.resolvePathSegment=that.locate,that},fluid.expectFilledSelector=function(result,message){result&&0===result.length&&result.jquery&&fluid.fail(message+': selector "'+result.selector+'" with name '+result.selectorName+" returned no results in context "+fluid.dumpEl(result.context))},fluid.initView=function(componentName,containerSpec,userOptions,localOptions){var container=fluid.container(containerSpec,!0);if(fluid.expectFilledSelector(container,'Error instantiating component with name "'+componentName),!container)return null;var receiver=function(that){that.container=container},that=fluid.initLittleComponent(componentName,userOptions,localOptions||{gradeNames:["fluid.viewComponent"]},receiver);that.dom||fluid.initDomBinder(that);var userJQuery=that.options.jQuery;return fluid.log("Constructing view component "+componentName+" with container "+container.constructor.expando+(userJQuery?" user jQuery "+userJQuery.expando:"")+" env: "+$.expando),that},fluid.initDomBinder=function(that,selectors){return that.container||fluid.fail("fluid.initDomBinder called for component with typeName "+that.typeName+' without an initialised container - this has probably resulted from placing "fluid.viewComponent" in incorrect position in grade merging order.  Make sure to place it to the right of any non-view grades in the gradeNames list to ensure that it overrides properly: resolved gradeNames is ',that.options.gradeNames," for component ",that),that.dom=fluid.createDomBinder(that.container,selectors||that.options.selectors||{}),that.locate=that.dom.locate,that.dom},fluid.findAncestor=function(element,test){for(element=fluid.unwrap(element);element;){if(test(element))return element;element=element.parentNode}},fluid.findForm=function(node){return fluid.findAncestor(node,function(element){return"form"===element.nodeName.toLowerCase()})},fluid.each(["text","html"],function(method){fluid[method]=function(node,newValue){return node=$(node),void 0===newValue?node[method]():node[method](newValue)}}),fluid.value=function(nodeIn,newValue){var node=fluid.unwrap(nodeIn),multiple=!1;if(void 0===node.nodeType&&node.length>1&&(node=node[0],multiple=!0),"input"!==node.nodeName.toLowerCase()||!/radio|checkbox/.test(node.type))return void 0===newValue?$(node).val():$(node).val(newValue);var name=node.name;void 0===name&&fluid.fail("Cannot acquire value from node "+fluid.dumpEl(node)+" which does not have name attribute set");var elements;if(multiple)elements=nodeIn;else{elements=node.ownerDocument.getElementsByName(name);var scope=fluid.findForm(node);elements=$.grep(elements,function(element){return element.name!==name?!1:!scope||fluid.dom.isContainer(scope,element)})}if(void 0===newValue){var checked=$.map(elements,function(element){return element.checked?element.value:null});return"radio"===node.type?checked[0]:checked}"boolean"==typeof newValue&&(newValue=newValue?"true":"false"),$.each(elements,function(){this.checked=newValue instanceof Array?-1!==newValue.indexOf(this.value):newValue===this.value})},fluid.BINDING_ROOT_KEY="fluid-binding-root",fluid.findData=function(elem,name){for(;elem;){var data=$.data(elem,name);if(data)return data;elem=elem.parentNode}},fluid.bindFossils=function(node,data,fossils){$.data(node,fluid.BINDING_ROOT_KEY,{data:data,fossils:fossils})},fluid.boundPathForNode=function(node,fossils){node=fluid.unwrap(node);var key=node.name||node.id,record=fossils[key];return record?record.EL:null},fluid.applyBoundChange=function(node,newValue,applier){node=fluid.unwrap(node),void 0===newValue&&(newValue=fluid.value(node)),void 0===node.nodeType&&node.length>0&&(node=node[0]);var root=fluid.findData(node,fluid.BINDING_ROOT_KEY);root||fluid.fail("Bound data could not be discovered in any node above "+fluid.dumpEl(node));var name=node.name,fossil=root.fossils[name];fossil||fluid.fail("No fossil discovered for name "+name+" in fossil record above "+fluid.dumpEl(node)),"boolean"==typeof fossil.oldvalue&&(newValue=newValue[0]?!0:!1);var EL=root.fossils[name].EL;applier?applier.fireChangeRequest({path:EL,value:newValue,source:"DOM:"+node.id}):fluid.set(root.data,EL,newValue)},fluid.jById=function(id,dokkument){dokkument=dokkument&&9===dokkument.nodeType?dokkument:document;var element=fluid.byId(id,dokkument),togo=element?$(element):[];return togo.selector="#"+id,togo.context=dokkument,togo},fluid.byId=function(id,dokkument){dokkument=dokkument&&9===dokkument.nodeType?dokkument:document;var el=dokkument.getElementById(id);return el?(el.id!==id&&fluid.fail("Problem in document structure - picked up element "+fluid.dumpEl(el)+" for id "+id+" without this id - most likely the element has a name which conflicts with this id"),el):null},fluid.getId=function(element){return fluid.unwrap(element).id},fluid.allocateSimpleId=function(element){if(element=fluid.unwrap(element),!element||fluid.isPrimitive(element))return null;if(!element.id){var simpleId="fluid-id-"+fluid.allocateGuid();element.id=simpleId}return element.id},fluid.getDocument=function(element){var node=fluid.unwrap(element);return 9===node.nodeType?node:node.ownerDocument},fluid.defaults("fluid.ariaLabeller",{gradeNames:["fluid.viewComponent"],labelAttribute:"aria-label",liveRegionMarkup:'<div class="liveRegion fl-hidden-accessible" aria-live="polite"></div>',liveRegionId:"fluid-ariaLabeller-liveRegion",invokers:{generateLiveElement:{funcName:"fluid.ariaLabeller.generateLiveElement",args:"{that}"},update:{funcName:"fluid.ariaLabeller.update",args:["{that}","{arguments}.0"]}},listeners:{onCreate:{func:"{that}.update",args:[null]}}}),fluid.ariaLabeller.update=function(that,newOptions){if(newOptions=newOptions||that.options,that.container.attr(that.options.labelAttribute,newOptions.text),newOptions.dynamicLabel){var live=fluid.jById(that.options.liveRegionId);0===live.length&&(live=that.generateLiveElement()),live.text(newOptions.text)}},fluid.ariaLabeller.generateLiveElement=function(that){var liveEl=$(that.options.liveRegionMarkup);return liveEl.prop("id",that.options.liveRegionId),$("body").append(liveEl),liveEl};var LABEL_KEY="aria-labelling";fluid.getAriaLabeller=function(element){element=$(element);var that=fluid.getScopedData(element,LABEL_KEY);return that},fluid.updateAriaLabel=function(element,text,options){options=$.extend({},options||{},{text:text});var that=fluid.getAriaLabeller(element);return that?that.update(options):(that=fluid.ariaLabeller(element,options),fluid.setScopedData(element,LABEL_KEY,that)),that};var dismissList={};$(document).click(function(event){for(var target=fluid.resolveEventTarget(event);target;){if(dismissList[target.id])return;target=target.parentNode}fluid.each(dismissList,function(dismissFunc,key){dismissFunc(event),delete dismissList[key]})}),fluid.globalDismissal=function(nodes,dismissFunc){fluid.each(nodes,function(node){var id=fluid.unwrap(node).ownerDocument===document?fluid.allocateSimpleId(node):fluid.allocateGuid();dismissFunc?dismissList[id]=dismissFunc:delete dismissList[id]})},fluid.now=function(){return Date.now?Date.now():(new Date).getTime()},fluid.deadMansBlur=function(control,options){var that={options:$.extend(!0,{},fluid.defaults("fluid.deadMansBlur"),options)};return that.blurPending=!1,that.lastCancel=0,that.canceller=function(event){fluid.log("Cancellation through "+event.type+" on "+fluid.dumpEl(event.target)),that.lastCancel=fluid.now(),that.blurPending=!1},that.noteProceeded=function(){fluid.globalDismissal(that.options.exclusions)},that.reArm=function(){fluid.globalDismissal(that.options.exclusions,that.proceed)},that.addExclusion=function(exclusions){fluid.globalDismissal(exclusions,that.proceed)},that.proceed=function(event){fluid.log("Direct proceed through "+event.type+" on "+fluid.dumpEl(event.target)),that.blurPending=!1,that.options.handler(control)},fluid.each(that.options.exclusions,function(exclusion){exclusion=$(exclusion),fluid.each(exclusion,function(excludeEl){$(excludeEl).bind("focusin",that.canceller).bind("fluid-focus",that.canceller).click(that.canceller).mousedown(that.canceller)})}),that.options.cancelByDefault?that.reArm():$(control).bind("focusout",function(event){fluid.log("Starting blur timer for element "+fluid.dumpEl(event.target));var now=fluid.now();fluid.log("back delay: "+(now-that.lastCancel)),now-that.lastCancel>that.options.backDelay&&(that.blurPending=!0),setTimeout(function(){that.blurPending&&that.options.handler(control)},that.options.delay)}),that},fluid.defaults("fluid.deadMansBlur",{gradeNames:"fluid.function",delay:150,backDelay:100})}(jQuery,fluid_2_0_0);