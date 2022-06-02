// CustomValueEditor.tsx
import { format, parse } from 'date-fns';
import DatePicker from 'react-datepicker';
import { ValueEditor, ValueEditorProps } from 'react-querybuilder';
import { BootstrapValueEditor } from '@react-querybuilder/bootstrap';
import 'react-datepicker/dist/react-datepicker.css';

const CustomValueEditor = (props) => {
    const dateFormat = 'dd.MM.yyyy';

    if (props.fieldData.datatype === 'date') {
        return (
            <div>
                <DatePicker
                    dateFormat={dateFormat}
                    selected={!props.value ? null : parse(props.value, dateFormat, new Date())}
                    onChange={(d: Date) => props.handleOnChange(d ? format(d, dateFormat) : null)}
                />
            </div>
        );
    }
    return <BootstrapValueEditor {...props} />;
};

export default CustomValueEditor;