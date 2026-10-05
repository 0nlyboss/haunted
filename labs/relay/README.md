# Relay

A compact realtime service-monitoring interface prototype. The current standalone demo generates changing telemetry in-browser so the interaction can be explored without pretending a hosted monitoring backend exists.

## Current slice
- Four service states
- Changing latency telemetry
- Aggregate mean latency
- Session uptime counter
- Responsive monitoring UI

## Run
Open `index.html` in a browser. A later backend iteration can replace the local demo feed with WebSocket events without changing the product concept.