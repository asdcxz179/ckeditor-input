
import { Command } from 'ckeditor5/src/core';
import { findOptimalInsertionRange } from 'ckeditor5/src/widget';
/**
 * The page break command.
 *
 * The command is registered by {@link module:page-break/pagebreakediting~PageBreakEditing} as `'pageBreak'`.
 *
 * To insert a page break at the current selection, execute the command:
 *
 *		editor.execute( 'pageBreak' );
 */
export default class InputCommand extends Command {
    /**
     * @inheritDoc
     */
    refresh() {
        const model = this.editor.model;
        const schema = model.schema;
        const selection = model.document.selection;
        this.isEnabled = true;
    }
    /**
     * Executes the command.
     *
     * @fires execute
     */
    execute() {
        const model = this.editor.model;
        model.change(writer => {
            const inputInsertElement = writer.createElement('cpkmInput');
            model.insertObject(inputInsertElement);
            // const selection = editor.model.document.selection;
            // const insertPosition = selection.getFirstPosition();

            // editor.model.change(writer => {
            // writer.insertElement(inputInsertElement, insertPosition);
            // });
        });
    }
}