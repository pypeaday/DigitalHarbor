#!/usr/bin/env bash
# Print a free localhost port. Kernel-assigned via bind(0), then released —
# tiny race window, good enough for dev servers.
python3 -c "import socket;s=socket.socket();s.bind(('127.0.0.1',0));print(s.getsockname()[1]);s.close()"
