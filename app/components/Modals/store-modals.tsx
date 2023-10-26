"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useStoreModal } from "@/app/hooks/use-store-modal";
import Modal from "../ui/Modal";
import z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import  axios from 'axios'
import toast from "react-hot-toast";

const formSchema = z.object({
  name: z.string().min(1),
});

const StoreModal = () => {
  const storeModal = useStoreModal();

  const [loading, setLoading] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setLoading(true)

      const response = await axios.post('/api/stores', values)

      // toast.success("Store created successfuly.")
      window.location.assign(`/${response.data.id}`)
      
    } catch (error) {
      toast.error("Something went wrong.")
    } finally {
      setLoading(false)
    }
  };

  return (
    <div>
      <Modal
        title="Create Store"
        description="Add a new store to manage products and cayegories"
        isOpen={storeModal.isOpen}
        onClose={storeModal.onClose}
      >
        <div>
          <div>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <FormField
                  
                  name="name"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-[15px] font-medium leading-[35px]">
                        Name
                      </FormLabel>
                      <FormControl>
                        <Input disabled={loading} placeholder="E-commerce" {...field} />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="flex items-baseline justify-end gap-2 mt-4">
                  <Button disabled={loading} onClick={storeModal.onClose}>Cancel</Button>
                  <Button disabled={loading} variant="outline" type="submit">
                    Continue
                  </Button>
                </div>
              </form>
            </Form>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default StoreModal;
