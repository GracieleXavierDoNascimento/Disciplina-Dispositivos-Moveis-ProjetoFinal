export default EditableField = ({ label, value, onChangeText, field, multiline = false, placeholder }) => {
  if (editMode[field]) {
    return (
      <>
        <Text style={styles.label}>{label}:</Text>
        <TextInput
          style={styles.input}
          placeholder={placeholder}
          multiline={multiline}
          value={value}
          onChangeText={onChangeText}
        />
      </>
    );
  } else {
    return (
      <>
        <View style={styles.fieldHeader}>
          <Text style={styles.label}>{label}:</Text>
          <TouchableOpacity onPress={() => toggleEditMode(field)}>
            <Feather name="edit-2" size={16} color="#4B0056" />
          </TouchableOpacity>
        </View>
        <Text style={styles.fieldText}>{value || 'Não informado'}</Text>
      </>
    );
  }
};