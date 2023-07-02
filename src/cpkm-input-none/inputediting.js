import Plugin from '@ckeditor/ckeditor5-core/src/plugin';
import InputCommand from './inputcommand.js';
import './theme/input.css';

export default class CpkmInputNoneEditing extends Plugin {

    init() {
        this._defineConverters();
        this.editor.commands.add( 'insertCpkmInputNone', new InputCommand( this.editor ) );
    }

    _defineConverters() {                                                      // ADDED
        const conversion = this.editor.conversion;

        conversion.elementToElement( {
            model: 'cpkmInputNone',
            view: {
                name: 'span',
                classes: 'cpkm-input-none',
                attributes: {
                    'contenteditable': true,
                }
            }
        } );

        conversion.for( 'upcast' ).elementToElement( {
            model: 'cpkmInputNone',
            view: {
                name: 'span',
                classes: 'cpkm-input-none',
                attributes: {
                    'contenteditable': true,
                }
            }
        } );
        conversion.for( 'dataDowncast' ).elementToElement( {
            model: 'cpkmInputNone',
            view: {
                name: 'span',
                classes: 'cpkm-input-none',
                attributes: {
                    'contenteditable': true,
                }
            }
        } );
        conversion.for( 'editingDowncast' ).elementToElement( {
            model: 'cpkmInputNone',
            view: ( modelElement, { writer: viewWriter } ) => {
                // Note: You use a more specialized createEditableElement() method here.
                const input = viewWriter.createEditableElement( 'span', { class: 'cpkm-input-none' } );
                return toWidgetEditable( input, viewWriter );
            }
        } );

    }
}
