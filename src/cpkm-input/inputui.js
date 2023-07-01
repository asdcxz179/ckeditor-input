import Plugin from '@ckeditor/ckeditor5-core/src/plugin';
import ButtonView from '@ckeditor/ckeditor5-ui/src/button/buttonview';
import inputIcon from '@ckeditor/ckeditor5-page-break/theme/icons/pagebreak.svg';

export default class CpkmInputUI extends Plugin {

    init() {
        console.log( 'CpkmInputUI#init() got called' );
        this._defineSchema();
    }

    _defineSchema() {                                                          // ADDED
        const schema = this.editor.model.schema;
        const editor = this.editor;
        const t = editor.t;

        schema.register( 'cpkmInput', {
            isLimit: true,
            isInline: true,
            allowIn: [ '$root', '$container' ],
            inheritAllFrom: '$blockObject'
        });
        
        // The "simpleBox" button must be registered among the UI components of the editor
        // to be displayed in the toolbar.
        editor.ui.componentFactory.add( 'cpkmInput', locale => {
            // The state of the button will be bound to the widget command.
            const command = editor.commands.get( 'insertCpkmInput' );

            // The button will be an instance of ButtonView.
            const buttonView = new ButtonView( locale );

            buttonView.set( {
                // The t() function helps localize the editor. All strings enclosed in t() can be
                // translated and change when the language of the editor changes.
                label: t( 'Cpkm Input' ),
                withText: true,
                tooltip: true
            } );

            // Bind the state of the button to the command.
            buttonView.bind( 'isOn', 'isEnabled' ).to( command, 'value', 'isEnabled' );

            // Execute the command when the button is clicked (executed).
            this.listenTo( buttonView, 'execute', () => editor.execute( 'insertCpkmInput' ) );

            return buttonView;
        } );
    }
}