sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageBox"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, MessageBox) {
        "use strict";

        return Controller.extend("at.cloudna.zhoui505.controller.App", {
            onInit: function () {

            },

             genderFormatter:function(sKey){
                 let oView = this.getView();
                 let oI18nModel = oView.getModel("i18n");
                let oResourceBundle = oI18nModel.getResourceBundle();
                let sText = oResourceBundle.getText(sKey);
                return sText;
             },
             onSavePressed: function(){
                 let oModel = this.getView().getModel();
                 let oData = oModel.getData();
                MessageBox.success(JSON.stringify(oData));
              },
             

        });
    });
