import json
import backend.server as s
routes = sorted({getattr(r,'path',None) for r in s.app.routes if getattr(r,'path',None)})
print(json.dumps(routes, indent=2))
