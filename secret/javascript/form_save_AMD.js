var galaxytool=window.galaxytool||{};
galaxytool.FormSaveHelper={showSaveScreen:function(a){require(["galaxytool/FormSave"],function(b){(new b(a)).showSaveScreen()})},showLoadScreen:function(a){require(["galaxytool/FormSave"],function(b){(new b(a)).showLoadScreen()})},loadFormData:function(a,b){require(["galaxytool/FormSave"],function(c){(new c(a)).loadFormData(b)})},deleteFormData:function(a,b){require(["galaxytool/FormSave"],function(c){(new c(a)).deleteFormData(b)})},validateSaveScreen:function(a){require(["galaxytool/FormSave"],function(b){(new b(a)).validateSaveScreen()})}};
