'use client'

import {useEffect, useRef, useState} from 'react'
import {useSelectedLayoutSegments} from 'next/navigation'
import SidebarLinkGroup from './sidebar-link-group'
import SidebarLink from './sidebar-link'
import {useAdminProvider} from "@/src/components/providers/admin-provider";
import Image from "next/image";
import Logo from "@/public/img/logo/logo-no-text.png"

export default function AdminSidebar() {
    const sidebar = useRef<HTMLDivElement>(null)
    const {sidebarOpen, setSidebarOpen} = useAdminProvider()
    const [sidebarExpanded, setSidebarExpanded] = useState<boolean>(true)
    const segments = useSelectedLayoutSegments()
    const expandOnly = false

    // close on click outside
    useEffect(() => {
        const clickHandler = ({target}: { target: EventTarget | null }): void => {
            if (!sidebar.current) return
            if (!sidebarOpen || sidebar.current.contains(target as Node)) return
            setSidebarOpen(false)
        }
        document.addEventListener('click', clickHandler)
        return () => document.removeEventListener('click', clickHandler)
    })

    // close if the esc key is pressed
    useEffect(() => {
        const keyHandler = ({keyCode}: { keyCode: number }): void => {
            if (!sidebarOpen || keyCode !== 27) return
            setSidebarOpen(false)
        }
        document.addEventListener('keydown', keyHandler)
        return () => document.removeEventListener('keydown', keyHandler)
    })


    return (
        <div className={`min-w-fit ${sidebarExpanded ? 'sidebar-expanded' : ''}`}>
            {/* Sidebar backdrop (mobile only) */}
            <div
                className={`fixed inset-0 bg-slate-900 bg-opacity-30 z-40 lg:hidden lg:z-auto transition-opacity duration-200 ${
                    sidebarOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
                }`}
                aria-hidden="true"
            ></div>


            <div
                id="sidebar"
                ref={sidebar}
                className={`flex flex-col absolute z-40 left-0 top-0 lg:static lg:left-auto lg:top-auto lg:translate-x-0 h-[100dvh] lg:overflow-y-auto no-scrollbar w-64 lg:w-20 lg:sidebar-expanded:!w-64 2xl:!w-64 shrink-0 bg-slate-800 p-4 transition-all duration-200 ease-in-out ${
                    sidebarOpen ? 'translate-x-0' : '-translate-x-64'
                }`}
            >
                {/* Sidebar header */}
                <div className="flex justify-between mb-10 pr-3 sm:px-2">
                    {/* Close button */}
                    <button
                        className="lg:hidden text-slate-500 hover:text-slate-400"
                        onClick={() => {
                            console.log('ok')
                            setSidebarOpen(!sidebarOpen)
                        }}
                        aria-controls="sidebar"
                        aria-expanded={sidebarOpen}
                    >
                        <span className="sr-only">Close sidebar</span>
                        <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24"
                             xmlns="http://www.w3.org/2000/svg">
                            <path d="M10.7 18.7l1.4-1.4L7.8 13H20v-2H7.8l4.3-4.3-1.4-1.4L4 12z"/>
                        </svg>
                    </button>
                    {/* Logo */}
                    <Image src={Logo} alt={"Amiens food"} width={100} height={50}/>
                </div>

                {/* Links */}
                <div className="space-y-8">
                    <div>
                        <h3 className="text-xs uppercase text-slate-500 font-semibold pl-3">
                              <span className="hidden lg:block lg:sidebar-expanded:hidden 2xl:hidden text-center w-6"
                                    aria-hidden="true">
                                •••
                              </span>
                            <span className="lg:hidden lg:sidebar-expanded:block 2xl:block">Personnaliser</span>
                        </h3>
                        <ul className="mt-3">
                            <li className={`px-3 py-2 rounded-sm mb-0.5 last:mb-0 ${segments.includes('texts') && 'bg-slate-900'}`}>
                                <SidebarLink href="/admin/texts">
                                    <div className="flex items-center">
                                        <svg className="shrink-0 h-6 w-6" viewBox="0 0 24 24">
                                            <path
                                                className={`fill-current ${segments.includes('texts') ? 'text-indigo-300' : 'text-slate-400'}`}
                                                d="M13 15l11-7L11.504.136a1 1 0 00-1.019.007L0 7l13 8z"
                                            />
                                            <path
                                                className={`fill-current ${segments.includes('texts') ? 'text-indigo-600' : 'text-slate-700'}`}
                                                d="M13 15L0 7v9c0 .355.189.685.496.864L13 24v-9z"
                                            />
                                            <path
                                                className={`fill-current ${segments.includes('texts') ? 'text-indigo-500' : 'text-slate-600'}`}
                                                d="M13 15.047V24l10.573-7.181A.999.999 0 0024 16V8l-11 7.047z"
                                            />
                                        </svg>
                                        <span
                                            className="text-sm font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                              Textes
                                            </span>
                                    </div>
                                </SidebarLink>
                            </li>
                        </ul>
                    </div>
                    {/* Pages group */}
                    <div>
                        <h3 className="text-xs uppercase text-slate-500 font-semibold pl-3">
                                  <span
                                      className="hidden lg:block lg:sidebar-expanded:hidden 2xl:hidden text-center w-6"
                                      aria-hidden="true">
                                    •••
                                  </span>
                            <span className="lg:hidden lg:sidebar-expanded:block 2xl:block">Gestion</span>
                        </h3>
                        <ul className="mt-3">
                            {/* Partners */}
                            <li className={`px-3 py-2 rounded-sm mb-0.5 last:mb-0 ${segments.includes('partners') && 'bg-slate-900'}`}>
                                <SidebarLink href="/admin/partners">
                                    <div className="flex items-center">
                                        <svg className="shrink-0 h-6 w-6" viewBox="0 0 24 24">
                                            <path
                                                className={`fill-current ${segments.includes('partners') ? 'text-indigo-500' : 'text-slate-600'}`}
                                                d="M18.974 8H22a2 2 0 012 2v6h-2v5a1 1 0 01-1 1h-2a1 1 0 01-1-1v-5h-2v-6a2 2 0 012-2h.974zM20 7a2 2 0 11-.001-3.999A2 2 0 0120 7zM2.974 8H6a2 2 0 012 2v6H6v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5H0v-6a2 2 0 012-2h.974zM4 7a2 2 0 11-.001-3.999A2 2 0 014 7z"
                                            />
                                            <path
                                                className={`fill-current ${segments.includes('partners') ? 'text-indigo-300' : 'text-slate-400'}`}
                                                d="M12 6a3 3 0 110-6 3 3 0 010 6zm2 18h-4a1 1 0 01-1-1v-6H6v-6a3 3 0 013-3h6a3 3 0 013 3v6h-3v6a1 1 0 01-1 1z"
                                            />
                                        </svg>
                                        <span
                                            className="text-sm font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                              Partenaires
                                            </span>
                                    </div>
                                </SidebarLink>
                            </li>
                            <li className={`px-3 py-2 rounded-sm mb-0.5 last:mb-0 ${segments.includes('posts') && 'bg-slate-900'}`}>
                                <SidebarLink href="/admin/posts">
                                    <div className="flex items-center">
                                        <svg className="shrink-0 h-6 w-6" viewBox="0 0 24 24">
                                            <path
                                                className={`fill-current ${segments.includes('posts') ? 'text-indigo-500' : 'text-slate-600'}`}
                                                d="M8 1v2H3v19h18V3h-5V1h7v23H1V1z"
                                            />
                                            <path
                                                className={`fill-current ${segments.includes('posts') ? 'text-indigo-500' : 'text-slate-600'}`}
                                                d="M1 1h22v23H1z"/>
                                            <path
                                                className={`fill-current ${segments.includes('posts') ? 'text-indigo-300' : 'text-slate-400'}`}
                                                d="M15 10.586L16.414 12 11 17.414 7.586 14 9 12.586l2 2zM5 0h14v4H5z"
                                            />
                                        </svg>
                                        <span
                                            className="text-sm font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                              Articles
                                            </span>

                                    </div>
                                </SidebarLink>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Expand / collapse button */}
                <div className="pt-3 hidden lg:inline-flex 2xl:hidden justify-end mt-auto">
                    <div className="px-3 py-2">
                        <button onClick={() => {
                            setSidebarExpanded(!sidebarExpanded)
                        }
                        }>
                            <span className="sr-only">Expand / collapse sidebar</span>
                            <svg className="w-6 h-6 fill-current sidebar-expanded:rotate-180" viewBox="0 0 24 24">
                                <path className="text-slate-400"
                                      d="M19.586 11l-5-5L16 4.586 23.414 12 16 19.414 14.586 18l5-5H7v-2z"/>
                                <path className="text-slate-600" d="M3 23H1V1h2z"/>
                            </svg>
                        </button>
                    </div>
                </div>

            </div>
        </div>

    )
}