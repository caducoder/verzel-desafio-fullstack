/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Controller, Control } from "react-hook-form";
import { TextField } from "@mui/material"

export interface FormInputProps {
  name: string;
  control: Control<any, any>;
  label: string;
  type: 'text' | 'email' | 'password' | 'number'
  required?: true | false,
  errorText?: string
}

function FormInput({ name, control, label, type, required, errorText }: FormInputProps) {
  return (
    <Controller
      name={name}
      control={control}
      defaultValue=""
      rules={{
        required: required && errorText,

      }}
      render={({
        field: { onChange, value },
        fieldState: { error }
      }) => (
        <TextField
          onChange={onChange}
          value={value}
          fullWidth
          label={label}
          variant="outlined"
          error={!!error}
          helperText={error ? error.message : null}
          type={type}

        />
      )}
    />
  );
}

export default FormInput;