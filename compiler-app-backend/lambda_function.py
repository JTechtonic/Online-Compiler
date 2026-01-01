import sys
import subprocess
import io


def execute_python(code):
	# Executes python code and captures output
	original_stdout = sys.stdout
	sys.stdout = output_capture = io.StringIO()

	try:
		exec(code) # Use exec() to capture output
		output = output_capture.getvalue()
		print('out of the code', output)
		return output
	except Exception as e:
		return str(e)
	finally:
		sys.stdout = original_stdout


def execute_java(code):
	try:
		print('Received code: ', code)
		# Create a temp java file
		with open('/tmp/Main.java', 'w') as java_file:
			java_file.write(code)

		# Compile the Java source file
		compiler_result = subprocess.run(
			['javac', '/tmp/Main.java'], stdout=subprocess.PIPE, stderr=subprocess.PIPE
		)

		print('Compilation result: ', compiler_result.returncode)
		if compiler_result.returncode != 0:
			# Failed compilation, return error message
			return compiler_result.stderr.decode()
		
		# Run the compiled Java code
		run_result = subprocess.run(
			['java', '-classpath', '/tmp', 'Main'], stdout=subprocess.PIPE, stderr=subprocess.PIPE
		)

		print('Run result: ', run_result.returncode)
		return run_result.stdout.decode()
	except Exception as e:
		return str(e)


def execute_cpp(code):
	try:
		print('Received code:\n', code)

		# Create temp c++ file
		with open('/tmp/temp.cpp', 'w') as cpp_file:
			cpp_file.write(code)
		
		# Compile c++ file
		compile_result = subprocess.run(
			['g++', '/tmp/temp.cpp', '-o', '/tmp/temp'],
			stdout=subprocess.PIPE, stderr=subprocess.PIPE
		)

		print('Compilation result: ', compile_result.returncode)
		if compile_result.returncode != 0:
			# Failed compilation, return error
			return compile_result.stderr.decode()
		
		# Run compiled c++ code
		run_result = subprocess.run(
			['/tmp/temp'],
			stdout=subprocess.PIPE, stderr=subprocess.PIPE
		)

		print('Run result:', run_result.returncode)
		return run_result.stdout.decode()
	except Exception as e:
		return str(e)


def handler(event, context):
	# Inputs from JSON
	language = event.get('language', 'python')
	code = event.get('code', '')

	if language == 'python':
		result = execute_python(code)
	elif language == 'java':
		result = execute_java(code)
	elif language == 'cpp':
		result = execute_cpp(code)
	else:
		result = 'Unsupported Language'
	
	return {
		"statusCode": 200,
		"headers": {
        	"Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Headers": "Content-Type",
            "Access-Control-Allow-Methods": "OPTIONS,POST"
        },
		"body": result
	}