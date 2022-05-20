sap.ui.define([
    "at/cloudna/zhoui505/controller/BaseController",
    "sap/m/MessageBox",
    "sap/ui/model/json/JSONModel",
    "sap/ui/core/Fragment"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (BaseController, MessageBox, JSONModel, Fragment) {
        "use strict";

        return BaseController.extend("at.cloudna.zhoui505.controller.App", {

            _fragmentList : {}, 

            

            onInit: function () {
                this.setContentDensity();
            },

            genderFormatter: function(sGenderKey){
                let oView = this.getView();
                let oModel = oView.getModel("i18n");
                let oResourceBundle = oModel.getResourceBundle();

                switch(sGenderKey){
                    case "1":
                        return oResourceBundle.getText("male");
                    case "2": 
                        return oResourceBundle.getText("female");
                    default:
                        return sGenderKey;
                }
            },

            onDeleteButtonPressed: function(oEvent){
                this._delete(oEvent.getSource());
            },
            
            onListItemPressed: function(oEvent){
             //   let sPath = oEvent.getSource().getBindingContext().getPath();
                let oRouter = this.getOwnerComponent().getRouter();

                oRouter.navTo("Customer", {
                    path: sPath.split("/") [1]
                });                
            },

            onCreatePressed: function(){
                let oRouter = this.getOwnerComponent().getRouter();
                oRouter.navTo("CreateCustomer", null, false);
            } ,                       

            onDeletePressed: function(oEvent){
                this._delete(oEvent.getParameters().listItem);
            },
            
            _delete: function(oListItem){
                let oModel = this.getView().getModel();
                //let oResourceBundle = this.getView().getModel("i18n").getResourceBundle();
                let sPath = oListItem.getBindingContext().getPath();
            
                MessageBox.warning(this.getLocalizedText("sureToDeleteQuestion"), {
                    title: this.getLocalizedText("sureToDeleteTitle"),
                    actions: [MessageBox.Action.YES, MessageBox.Action.NO],
                    emphasizedAction: MessageBox.Action.YES,
                    onClose: function(oAction){
                        if(MessageBox.Action.YES === oAction){
                            oModel.remove(sPath, {
                                success: (oData,Response) => {
                                    MessageBox.success(this.getLocalizedText("dialog.delete.success"));
                                },
                                error: (oError) => {
                                    MessageBox.error(oError.message);
                                }
                            });

                        }
                    }
                });
            }

        });
    });
