'use client'
import { CopyIcon } from "@radix-ui/react-icons"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { useAppStore } from "@/store/store"
import { useUser } from "@clerk/nextjs"
import { db, storage } from "@/firebase"
import { deleteObject, ref } from "firebase/storage"
import { deleteDoc, doc } from "firebase/firestore"
import { useToast } from "./ui/use-toast"

export function DeleteModal() {
    const { user } = useUser();
    const [fileId, setFileId, isDeleteModalOpen, setIsDeleteModalOpen] = useAppStore(state => [state.fileId ,state.setFileId, state.isDeleteModalOpen, state.setIsDeleteModalOpen])
    const {toast} = useToast();

    async function deleteFile() {
      if(!user || !fileId) return;

      const fileRef = ref(storage, `users/${user.id}/files/${fileId}`)

      deleteObject(fileRef).then(async () => {
        console.log("File deleted")
        toast({
            title: "File Deleted",
            variant: "success",
        })

        deleteDoc(doc(db, "users", user.id, "files", fileId)).then(() => {
            console.log("Deleted")
        })
      }).catch ((error) => {
        console.log("Error in delete modal file.")
        toast({
            title: "Error",
            description: "An error occurred deleting.",
            variant: "destructive"
        })
      }).finally(() => {
        setIsDeleteModalOpen(false);
      })
      
    }

    return (
    <Dialog open={isDeleteModalOpen} onOpenChange={(isOpen) => {setIsDeleteModalOpen(isOpen)}}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Are you sure you want to delete?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete your file.
          </DialogDescription>
        </DialogHeader>
        <div className="flex space-x-2 py-3">
            <Button size={"sm"} className="px-3 flex-1" variant={"ghost"} onClick={() => setIsDeleteModalOpen(false)}>
                <span className="sr-only">Cancel</span>
                <span>Cancel</span>
            </Button>

            <Button type="submit" size={"sm"} variant={"destructive"} className="px-3 flex-1" onClick={() => deleteFile()}>
                <span className="sr-only">Delete</span>
                <span>Delete</span>
            </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
