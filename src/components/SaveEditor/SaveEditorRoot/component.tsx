
import * as React from "react";

import List from "material-ui/List";
import MenuItem from "material-ui/MenuItem";

import {
    OniSave
} from "oni-save-parser";


import DuplicantEditorPage from "../Pages/DuplicantEditorPage";


const PAGES = {
    "duplicants": DuplicantEditorPage
};

interface State {
    page: keyof typeof PAGES;
}

export interface SaveEditorProps {
    className?: string
    save: OniSave;
}

export default class SaveEditor extends React.Component<SaveEditorProps, State> {

    constructor(props: SaveEditorProps) {
        super(props);
        this.state = {
            page: "duplicants"
        };
    }

    render() {
        const {
            className,
            save
        } = this.props;
        
        return (
            <div className={`layout-horizontal ${className || ''}`}>
                <div>
                    <List>
                        <MenuItem>Duplicants</MenuItem>
                    </List>
                </div>
                <div className="layout-item-fill scrolling-content">
                    <DuplicantEditorPage save={save}/>
                </div>
            </div>
        )
    }
}