import Plugin from '@ckeditor/ckeditor5-core/src/plugin';
import ElectronicSignCommand from './electronic-signcommand.js';
import './theme/input.css';

export default class ElectronicSignEditing extends Plugin {

    init() {
        this._defineConverters();
        this.editor.commands.add( 'insertElectronicSign', new ElectronicSignCommand( this.editor ) );
    }

    _defineConverters() {                                                      // ADDED
        const conversion = this.editor.conversion;

        conversion.elementToElement( {
            model: 'electronicSign',
            view: {
                name: 'canvas',
                classes: 'electronic-sign',
            }
        } );

        conversion.for( 'upcast' ).elementToElement( {
            model: 'electronicSign',
            view: {
                name: 'canvas',
                classes: 'electronic-sign',
            }
        } );
        conversion.for( 'dataDowncast' ).elementToElement( {
            model: 'electronicSign',
            view: {
                name: 'canvas',
                classes: 'electronic-sign',
            }
        } );
        conversion.for( 'editingDowncast' ).elementToElement( {
            model: 'electronicSign',
            view: ( modelElement, { writer: viewWriter } ) => {
                // Note: You use a more specialized createEditableElement() method here.
                const input = viewWriter.createEditableElement( 'canvas', { class: 'electronic-sign' } );
                return toWidgetEditable( input, viewWriter );
            }
        } );

    }
}
