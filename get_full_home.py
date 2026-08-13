import json

def main():
    log_path = "/home/prabhakar/.gemini/antigravity-cli/brain/432987d7-43b5-4529-af80-de8962c8f8d9/.system_generated/logs/transcript_full.jsonl"
    
    # We will reconstruct Home.jsx before Step 233 (which had the fully working original home page)
    # Let's run the line patcher up to Step 233
    current_lines = None
    with open(log_path, 'r') as f:
        for line in f:
            if not line.strip():
                continue
            try:
                data = json.loads(line)
            except Exception:
                continue
            
            step = data.get("step_index", 0)
            if step >= 233:
                break
                
            if data.get("source") == "MODEL" and "tool_calls" in data:
                for tc in data["tool_calls"]:
                    name = tc.get("name")
                    if name in ["replace_file_content", "write_to_file", "multi_replace_file_content"]:
                        args = tc.get("args", {})
                        if isinstance(args, str):
                            try:
                                args = json.loads(args)
                            except Exception:
                                pass
                        
                        target_file = args.get("TargetFile") or args.get("targetFile")
                        if target_file and target_file.endswith("Home.jsx"):
                            if name == "write_to_file":
                                content = args.get("CodeContent") or args.get("codeContent")
                                current_lines = content.splitlines()
                            elif name == "replace_file_content":
                                replacement = args.get("ReplacementContent") or args.get("replacementContent")
                                start = args.get("StartLine") or args.get("startLine")
                                end = args.get("EndLine") or args.get("endLine")
                                if current_lines:
                                    current_lines = current_lines[:start - 1] + replacement.splitlines() + current_lines[end:]
                                    
    if current_lines:
        full_content = '\n'.join(current_lines) + '\n'
        with open("src/pages/Home.jsx", "w") as f:
            f.write(full_content)
        print("Successfully wrote original full Home.jsx!")
    else:
        print("Failed to find original Home.jsx")

if __name__ == "__main__":
    main()
