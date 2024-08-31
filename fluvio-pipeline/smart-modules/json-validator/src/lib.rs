use fluvio_smartmodule::{smartmodule, SmartModuleRecord, Result as FluvioResult};
use serde_json::Value;

#[smartmodule(filter)]
pub fn filter(record: &SmartModuleRecord) -> FluvioResult<bool> {
    // Parse the record value as JSON
    let json_result: Result<Value, serde_json::Error> = serde_json::from_slice(record.value.as_ref());

    // Handle the result of the JSON parsing
    match json_result {
        Ok(_) => Ok(true), // If parsing is successful, return true to keep the record
        Err(_) => Ok(false), // If parsing fails, return false to drop the record
    }
}
