import _ from "lodash";
import { FilterSettings, FilterSettingValue } from "@eliastik/simple-sound-studio-lib";
import SettingFormRange from "../model/settingForm/SettingFormRange";

const utilFunctions = {
    getStringFromTemplate: (data: FilterSettings | null | undefined, str?: string) =>{
        if(str) {
            const template = _.template(str, { sourceURL: "" });
    
            try {
                if(data) {
                    return template(data);
                }
            } catch(e) {
                console.error(e);
            }
        }
        
        return "";
    },
    formatValueDisplay: (value: FilterSettingValue, form: SettingFormRange) => {
        if(form.valueFormatterDisplay) {
            return form.valueFormatterDisplay(value);
        }
    
        return value;
    }
};

export default utilFunctions;
