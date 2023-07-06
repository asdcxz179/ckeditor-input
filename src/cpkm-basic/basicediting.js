import Plugin from '@ckeditor/ckeditor5-core/src/plugin';
import CpkmBasicCommand from './basiccommand.js';
import './theme/basic.css';
import {  toWidget } from '@ckeditor/ckeditor5-widget';

export default class CpkmBasicEditing extends Plugin {

    init() {
        this._defineConverters();
        this.editor.commands.add( 'insertCpkmBasic', new CpkmBasicCommand( this.editor ) );
    }

    _defineConverters() {                                                      // ADDED
        const conversion = this.editor.conversion;

        conversion.for( 'upcast' ).elementToElement( {
            view: {
                name: 'span',
                classes: [ 'cpkm-basic' ],
                attributes: {
                    contenteditable: true,
                }
            },
            model:  ( viewElement, { writer: modelWriter } ) => {
                const target = viewElement.getAttribute( 'data-target' );
                const width = viewElement.getAttribute( 'data-width' );
                const alignment = viewElement.getAttribute( 'alignment' );
                return modelWriter.createElement( 'CpkmBasic' ,{
                    "data-target": target,
                    "data-width": width,
                    alignment: alignment,
                });
            }
        } );
        conversion.for( 'dataDowncast' ).elementToElement( {
            model: 'CpkmBasic',
            view: ( modelItem, { writer: viewWriter } ) => createCpkmBasicView( modelItem, viewWriter )
        } );
        conversion.for( 'editingDowncast' ).elementToElement( {
            model: 'CpkmBasic',
            view: ( modelItem, { writer: viewWriter } ) => {
                // Note: You use a more specialized createEditableElement() method here.
                const widgetElement = createCpkmBasicView( modelItem, viewWriter );
                return toWidget( widgetElement, viewWriter );
            }
        } );

        function createCpkmBasicView( modelItem, viewWriter ) {
            const target = modelItem.getAttribute( 'data-target' );
            const width = modelItem.getAttribute( 'data-width' );
            const alignment = modelItem.getAttribute( 'alignment' );

            let extend = {

            };

            let styles = [];
            if(width) {
                styles.push(`min-width:${width}px;`);
            }
            
            if(alignment) {
                extend["alignment"] = alignment;
            }

            if(target) {
                extend["data-target"] = target;
            }

            if(styles.length > 0) {
                extend.style = styles.join();
            }

            const CpkmBasicView = viewWriter.createContainerElement( 'span', {
                class: 'cpkm-basic',
                contenteditable: true,
                ...extend
            } );

            // Insert the CpkmBasic name (as a text).
            // const innerText = viewWriter.createText( '{' + name + '}' );
            // viewWriter.insert( viewWriter.createPositionAt( CpkmBasicView, 0 ), innerText );

            return CpkmBasicView;
        }
    }
}
