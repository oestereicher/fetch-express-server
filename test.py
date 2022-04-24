import json
import subprocess

with open("test_input.json") as input_file:
    test_input = json.load(input_file)['data']
with open("test_output.json") as expected_file:
    expected = json.load(expected_file)['data']

for i, test in enumerate(test_input):
    cmd = "curl -d '" + json.dumps(test) + "' -H 'Content-Type: application/json' localhost:3000"
    result = json.loads(subprocess.check_output(cmd, shell=True))
    assert result == expected[i]

print("All tests passed successfully!")