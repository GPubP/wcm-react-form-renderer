const addNameSpace = (namespace: string) => (fieldName: string): string =>
	namespace ? `${namespace}.${fieldName}` : fieldName;

export default addNameSpace;
