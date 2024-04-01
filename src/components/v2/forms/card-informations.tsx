import {useFormContext} from "react-hook-form";
import {FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage} from "@/src/components/ui/form";
import {Input} from "@/src/components/ui/input";
import * as React from "react";
import {Asterisk} from "lucide-react";

export const CardInformations = ({isRegistering = true}:{isRegistering?: boolean}) => {
    const form = useFormContext();
    
    return (
        <>
            {isRegistering && (
                <div className={"flex gap-6"}>
                    <FormField
                        control={form.control}
                        name={"firstname"}
                        render={({field}) => (
                            <FormItem className={"w-1/2"}>
                                <FormLabel className={"flex"}>
                                    Prénom
                                    <sup><Asterisk size={12} color={"red"}  /></sup>
                                </FormLabel>
                                <FormControl>
                                    <Input placeholder="Matthieu" {...field} maxLength={25}/>
                                </FormControl>
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name={"lastname"}
                        render={({field}) => (
                            <FormItem className={"w-1/2"}>
                                <FormLabel className={"flex"}>
                                    Nom
                                    <sup><Asterisk size={12} color={"red"}/></sup>
                                </FormLabel>
                                <FormControl>
                                    <Input placeholder="Dumont" {...field} maxLength={25}/>
                                </FormControl>
                            </FormItem>
                        )}
                    />
                </div>
            )}
            
            <FormField
                control={form.control}
                name={"surname"}
                render={({field}) => (
                    <FormItem>
                        <FormLabel>{"Mes potes m'appellent aussi"}</FormLabel>
                        <FormControl>
                            <Input placeholder="Mat" {...field} maxLength={32}/>
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />

            {isRegistering && (
                <>
                    <FormField
                        control={form.control}
                        name={"email"}
                        render={({field}) => (
                            <FormItem>
                                <FormLabel className={"flex"}>
                                    Adresse email
                                    <sup><Asterisk size={12} color={"red"}/></sup>
                                </FormLabel>
                                <FormControl>
                                    <Input type={"email"} placeholder="matthieu.dumont@gmail.com" {...field} />
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name={"password"}
                        render={({field}) => (
                            <FormItem>
                                <FormLabel className={"flex"}>
                                    Mot de passe
                                    <sup><Asterisk size={12} color={"red"}/></sup>
                                </FormLabel>
                                <FormControl>
                                    <Input type={"password"} {...field} />
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name={"picture"}
                        render={({field: {ref, name, onBlur, onChange}}) => (
                            <FormItem>
                                <FormLabel className={"flex"}>
                                    Photo {"d'identité"}
                                    <sup><Asterisk size={12} color={"red"}/></sup>
                                </FormLabel>
                                <FormControl>
                                    <Input type={"file"} name={name} ref={ref} accept={"image/png, image/jpeg"}
                                           onBlur={onBlur} onChange={(e) => {
                                        onChange(e.target.files?.[0]);
                                    }}/>
                                </FormControl>
                                {isRegistering && (
                                    <FormDescription>
                                        Elle est seulement utilisée pour la génération de la
                                        carte.
                                    </FormDescription>
                                )}

                                <FormMessage/>
                            </FormItem>
                        )}
                    />
                </>
            )}
        </>
    )

}