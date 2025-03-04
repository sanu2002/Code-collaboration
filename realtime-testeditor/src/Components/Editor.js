import React, { useEffect, useState } from "react";
import { Editor as MonacoEditor } from "@monaco-editor/react";
import { debounce } from "lodash";

export const Editor = ({ socketRef,roomid,codeRef,handlecallback}) => {
  const [code, setCode] = useState("");
  // console.log(code)


  
  useEffect(()=>{
    if(!socketRef.current ||!roomid) return;
    socketRef.current.on('code',({code})=>{
      setCode(code)
      // console.log(code)
    })




    return () => {
      socketRef.current.off('sync-code')
      socketRef.current.off('code')
    }

   

  },[socketRef.current,roomid])

  const handleEditorChange=(data)=>{
    setCode((prev) => {
      codeRef.current = data; // Now it always has the latest value
      return data;
    });
    // console.log("Updated codeRef after setCode:", codeRef.current);
    handlecallback(codeRef.current);

    






     socketRef.current.emit("code", { code: data,roomid:roomid }); // Emit code to server




  }






  return (
    <MonacoEditor
      height="100vh"
      defaultLanguage="javascript"
      theme="vs-dark"
      value={code} // Ensure real-time updates
      options={{
        fontSize: 20,
        wordWrap: "on",
        lineNumbers: "on",
      }}
      onChange={handleEditorChange}
    />
  );
};
