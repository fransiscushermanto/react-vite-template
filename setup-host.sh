#!/bin/sh

# Exit on error
set -e
trap 'exit' ERR

# Parse command line arguments
while [ "$#" -gt 0 ]; do
  case "$1" in
    --env=*) ENVIRONMENT="${1#*=}" ;;
    --mode=*) MODE="${1#*=}" ;;
    *) echo "Unknown parameter: $1"; exit 1 ;;
  esac
  shift
done

ENVIRONMENT=${ENVIRONMENT:-"local"}
MODE=${MODE:-""}

echo "⛏ Checking hosts file..."
case "$ENVIRONMENT" in 
    "local")
        if [ -n "$MODE" ] && [ "$MODE" != "undefined" ]; then
            ENV_FILE=".env.${MODE}"

            # If mode-specific env doesn't exist, try .env
            if [ ! -f "$ENV_FILE" ]; then
                echo "⚠️  ${ENV_FILE} not found, trying .env"
                ENV_FILE=".env"
                
                # If .env doesn't exist, try .env.local
                if [ ! -f "$ENV_FILE" ]; then
                    echo "⚠️  ${ENV_FILE} not found, trying .env.local"
                    ENV_FILE=".env.local"
                fi
            fi
        else 
            ENV_FILE=".env"
                # If .env doesn't exist, try .env.local
            if [ ! -f "$ENV_FILE" ]; then
                echo "⚠️  ${ENV_FILE} not found, trying .env.local"
                ENV_FILE=".env.local"
            fi
        fi

        echo "ℹ️  Using environment file: ${ENV_FILE}"
        
        if [ -f "$ENV_FILE" ]; then
            # Load environment variables from env file
            export $(cat "$ENV_FILE" | grep -v '#' | sed 's/\r$//' | awk '/=/ {print $0}' | xargs)
            echo "✅ Loaded environment from ${ENV_FILE}"
        else
            echo "⚠️  no environment file not found"
            exit 1
        fi

        # Read package name from package.json using node
        if [ -f "package.json" ]; then
            OWNER=$(node -p "require('./package.json').name")
        else
            echo "⚠️  package.json not found"
            exit 1
        fi
        
        # if devhost is not set, exit
        if [ -z "${DEV_HOST}" ]; then
            echo "⚠️  DEV_HOST is not set in .env or package.json"
            exit 1
        fi

        HOST_ENTRY=$(printf "127.0.0.1\t${DEV_HOST} #$OWNER")

        if [ -w "/etc/hosts" ]; then
            # Check if host already exists in /etc/hosts
            if grep -q "#$OWNER" /etc/hosts; then
                CURRENT_HOST=$(grep "#$OWNER" /etc/hosts)
                # Compare current host with the desired host entry
                if [ "$CURRENT_HOST" != "$HOST_ENTRY" ]; then
                    echo "⛏ Updating existing host entry..."
                    # Explicitly handle sed -i based on OS
                    if [ "$(uname -s)" = "Darwin" ]; then
                        # macOS/BSD sed: -i requires an extension argument. '' for no backup.
                        sudo sed -i '' "/#$OWNER/c\\
${HOST_ENTRY}" /etc/hosts
                    else
                        # GNU sed (common on Linux): -i without an extension argument for no backup.
                        sudo sed -i "/#$OWNER/c\\
${HOST_ENTRY}" /etc/hosts
                    fi
                    echo "✅ Updated host to: $DEV_HOST"
                else
                    echo "✅ Host is up to date"
                fi
            else 
                echo "⛏ Updating hosts file..."
                echo "$HOST_ENTRY" >> /etc/hosts
                echo "✅ Updated /etc/hosts with ${DEV_HOST}"
            fi
        else
            echo "⚠️  Running in container/cloud environment, skipping hosts file modification"
            exit 1
        fi
        ;;
    "cloud")
        # Cloud environment setup
        echo "ℹ️  Skipped, Running in cloud environment"
        # Add any cloud-specific setup here
        ;;

    *)
        echo "⚠️  Unknown environment: $ENVIRONMENT"
        exit 1
        ;;
esac