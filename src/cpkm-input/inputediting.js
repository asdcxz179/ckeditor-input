import Plugin from '@ckeditor/ckeditor5-core/src/plugin';
import InputCommand from './inputcommand.js';
import './theme/input.css';

export default class CpkmInputEditing extends Plugin {

    init() {
        this._defineConverters();
        this.editor.commands.add( 'insertCpkmInput', new InputCommand( this.editor ) );
    }

    _defineConverters() {                                                      // ADDED
        const conversion = this.editor.conversion;

        conversion.elementToElement( {
            model: 'cpkmInput',
            view: {
                name: 'span',
                classes: 'cpkm-input',
                attributes: {
                    'contenteditable': true,
                }
            }
        } );

        conversion.for( 'upcast' ).elementToElement( {
            model: 'cpkmInput',
            view: {
                name: 'span',
                classes: 'cpkm-input',
                attributes: {
                    'contenteditable': true,
                }
            }
        } );
        conversion.for( 'dataDowncast' ).elementToElement( {
            model: 'cpkmInput',
            view: {
                name: 'span',
                classes: 'cpkm-input',
                attributes: {
                    'contenteditable': true,
                }
            }
        } );
        conversion.for( 'editingDowncast' ).elementToElement( {
            model: 'cpkmInput',
            view: ( modelElement, { writer: viewWriter } ) => {
                // Note: You use a more specialized createEditableElement() method here.
                const input = viewWriter.createEditableElement( 'span', { class: 'cpkm-input' } );
                return toWidgetEditable( input, viewWriter );
            }
        } );

    }
}
