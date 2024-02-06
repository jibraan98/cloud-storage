'use client'
import { useAppStore } from '@/store/store';
import { useUser } from '@clerk/nextjs';
import React, { useState } from 'react'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '@/firebase';
import { useToast } from './ui/use-toast';
import { ToastAction } from './ui/toast';

function RenameModal() {
    const { user } = useUser();
    const [input, setInput] = useState("");
    const [fileId, filename, isRenameModalOpen, setIsRenameModalOpen] = useAppStore(state => [state.fileId ,state.filename, state.isRenameModalOpen, state.setIsRenameModalOpen])
    const { toast } = useToast()
    const renameFile = async () => {
        if(!user || !fileId) return;

        await updateDoc(doc(db, "users", user.id, "files", fileId), {
            filename: input,
        }).catch((error) => {
            toast({
                title: "Error",
                description: "There was an error updating your file.",
                variant: "destructive",
                action: <ToastAction onClick={() => setIsRenameModalOpen(true)} altText="Try again">Try again</ToastAction>,
            })
        })
        toast({
            title: "Success!",
            description: "Your file was successfully renamed.",
            variant: "success"
        })
        setInput("");
        setIsRenameModalOpen(false);
    }
    
    return (
    <Dialog open={isRenameModalOpen} onOpenChange={(isOpen) => {setIsRenameModalOpen(isOpen)}}>
    <DialogContent className="sm:max-w-md">
      <DialogHeader>
        <DialogTitle className='pb-2'>Rename the file</DialogTitle>
        <Input id='Link' defaultValue={filename} onChange={(e) => setInput(e.target.value)} onKeyDownCapture={(e) => {
            if (e.key === "Enter") {
                renameFile();
            }
        }}/>
      </DialogHeader>
      <div className="flex space-x-2 py-3">
          <Button size={"sm"} className="px-3 flex-1" variant={"ghost"} onClick={() => setIsRenameModalOpen(false)}>
              <span className="sr-only">Cancel</span>
              <span>Cancel</span>
          </Button>

          <Button type="submit" size={"sm"} className="px-3 flex-1" onClick={() => renameFile()}>
              <span className="sr-only">Rename</span>
              <span>Rename</span>
          </Button>
      </div>
    </DialogContent>
  </Dialog>
  )
}

export default RenameModal