# Define variables
FLUVIO_INSTALL_SCRIPT=https://hub.infinyon.cloud/install/install.sh
CONNECTOR_DIR=connectors
SMARTMODULE_DIR=connectors/smart-modules/json-validator
CDK_HUB=cdk hub download
FLUVIO_HUB=fluvio hub sm download
FLAG_FILE=.setup_complete
BASHRC_FILE=$(HOME)/.bashrc

# Ensure to stop on error and continue from the last stop if make all fails
.PHONY: all

all: setup_complete

# Function to print messages
define print_message
	@echo -e "\n\033[1m$(1)\033[0m\n"
endef

setup_complete: $(FLAG_FILE)

$(FLAG_FILE): setup_fluvio_environment install_sdf_beta1 start_fluvio download_packages deploy_connectors setup_sdf
	@touch $(FLAG_FILE)

setup_fluvio_environment:
	$(call print_message, "Setting up Fluvio environment...")
	@curl -fsS $(FLUVIO_INSTALL_SCRIPT) | bash || echo "Failed to run install script"
	. $(HOME)/.fvm/env || echo "Failed to source .fvm/env"
	. $(BASHRC_FILE)
	@grep -q 'source "$(HOME)/.fvm/env"' $(BASHRC_FILE) || echo 'source "$(HOME)/.fvm/env"' >> $(BASHRC_FILE)
	. $(BASHRC_FILE)
	@source ~/.bashrc

install_sdf_beta1:
	$(call print_message, "Installing SDF Beta 1 CLI...")
	@fvm install sdf-beta1

start_fluvio:
	$(call print_message, "Starting Fluvio cluster...")
	@fluvio cluster start

download_packages:
	$(call print_message, "Downloading connector and smartmodule packages...")
	@if [ ! -d "$(CONNECTOR_DIR)" ]; then echo "Directory $(CONNECTOR_DIR) does not exist. Exiting..."; exit 1; fi
	@cd $(CONNECTOR_DIR) && $(CDK_HUB) infinyon/http-source@0.3.8
	@cd $(CONNECTOR_DIR) && $(CDK_HUB) infinyon/http-sink@0.2.10
	@cd $(CONNECTOR_DIR) && $(FLUVIO_HUB) infinyon/regex-filter@0.2.0
	@cd $(SMARTMODULE_DIR) && smdk load

deploy_connectors:
	$(call print_message, "Deploying connectors...")
	@cd $(CONNECTOR_DIR) && cdk deploy start --ipkg infinyon-http-source-0.3.8.ipkg -c inbound.yaml --secrets secrets.txt
	@cd $(CONNECTOR_DIR) && cdk deploy start --ipkg infinyon-http-sink-0.2.10.ipkg -c outbound.yaml --secrets secrets.txt

shutdown_connectors:
	$(call print_message, "Connectors shutting down ...")
	@cd $(CONNECTOR_DIR) && cdk deploy shutdown --name sink-data
	@cd $(CONNECTOR_DIR) && cdk deploy shutdown --name raw-news-data

setup_sdf:
	$(call print_message, "Setting up SDF...")
	@sdf setup

clean:
	@rm -f $(FLAG_FILE)
	@echo "Cleaned up setup."
