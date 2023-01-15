export function getMessageFrom(err: unknown) {
    if (err && typeof err === 'object' && 'message' in err)
        return err.message;
    return "";
}

interface IEnvValueParams {
    name: string;
    isRequired?: boolean;
    type?: string;
    default?: any;
}

export const EnvValue = (params: IEnvValueParams) => {
    const { name, isRequired, type = 'string' } = params;

    return (target: any, propertyKey: string) => {
        const value = process.env[name] || params.default;
        if (!value && isRequired) {
            throw new Error(`Environment variable ${name} is required`);
        }

        let typedValue;
        switch (type) {
            case 'number':
                typedValue = value ? parseFloat(value) : 0;
                break;
            case 'boolean':
                typedValue = value === 'true';
                break;
            case 'string':
                typedValue = value;
                break;
            default:
                throw new Error(`Invalid type: ${type}`);
        }
        
        console.log(`[ENV]: Loaded ${value} for ${name}`);

        Object.defineProperty(target, propertyKey, {
            value: typedValue,
            writable: false,
            enumerable: true,
            configurable: true
        });
    }
}

