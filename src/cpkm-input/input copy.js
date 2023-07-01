import Plugin from '@ckeditor/ckeditor5-core/src/plugin';
import { toWidget } from 'ckeditor5/src/widget';
import ButtonView from '@ckeditor/ckeditor5-ui/src/button/buttonview';
import inputIcon from '@ckeditor/ckeditor5-page-break/theme/icons/pagebreak.svg';
import CpkmInputUI from './inputui.js';
import InputEditing from './inputediting.js';

export default class CpkmInput extends Plugin {
    static get requires() {
        return [ InputEditing, CpkmInputUI ];
    }

    init() {
        const editor = this.editor;

        const schema = editor.model.schema;
        const t = editor.t;
        const conversion = editor.conversion;
        schema.register('insertInput', {
            inheritAllFrom: '$blockObject'
        });

        // 添加自定义命令
        editor.commands.add('insertInput', {
            execute: () => {
                const model = editor.model;
                model.change(writer => {
                    
                    const inputInsertElement = writer.createElement('insertInput');
                    model.insertObject(inputInsertElement, null, null, {
                        setSelection: 'after'
                    });
                });
                // const inputHtml = '<input type="text" placeholder="Enter text">';
                // editor.model.insertContent(editor.model.builder.createText(inputHtml));
            }
        });


        // editor.commands.add('insertInput', new InputCommand(editor));

        // 添加自定义工具栏按钮
        editor.ui.componentFactory.add('insertInputButton', locale => {
            
            const view = new ButtonView(locale);

            view.set({
                label: 'Insert Input',
                icon: inputIcon,
                tooltip: true
            });

        // 绑定按钮点击事件
            // view.on('execute', () => {
            //     editor.execute('insertInput');
            // });
            this.listenTo(view, 'execute', () => {
                editor.execute('insertInput');
                editor.editing.view.focus();
            });

            return view;
        });
    }
}

/**
 * Converts a given {@link module:engine/view/element~Element} to a page break widget:
 * * Adds a {@link module:engine/view/element~Element#_setCustomProperty custom property} allowing to
 *   recognize the page break widget element.
 * * Calls the {@link module:widget/utils~toWidget} function with the proper element's label creator.
 */
function toInsertInputWidget(viewElement, writer) {
    writer.setCustomProperty('insertInput', true, viewElement);
    return toWidget(viewElement, writer);
}
