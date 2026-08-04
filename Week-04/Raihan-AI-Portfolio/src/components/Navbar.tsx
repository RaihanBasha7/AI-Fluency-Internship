import { AnimatePresence, motion } from 'framer-motion';
import { Menu, X, FileText, Hexagon } from 'lucide-react';
import { useState } from 'react';
import { NAV_ITEMS, SOCIALS } from '@/lib/data';
import { useScrolled } from '@/lib/hooks';
import { MagneticButton } from '@/components/MagneticButton';

export function Navbar() {
  const scrolled = useScrolled(24);
  const [open, setOpen] = useState(false);

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="fixed left-0 right-0 top-0 z-50 flex justify-center px-4 pt-4 sm:pt-5"
      >
        <nav
          className={`flex w-full max-w-5xl items-center justify-between rounded-2xl px-3 py-2.5 transition-all duration-500 sm:px-4 lg:max-w-6xl ${
            scrolled ? 'glass-strong shadow-[0_8px_40px_rgba(0,0,0,0.5)]' : 'border border-transparent bg-transparent'
          }`}
        >
          {/* Logo */}
          <a href="#home" className="group flex items-center gap-2.5 pl-1" aria-label="Home">
            <span className="relative flex h-8 w-8 items-center justify-center">
              <Hexagon className="h-8 w-8 text-accent-blue/70 transition-transform duration-500 group-hover:rotate-180" strokeWidth={1.2} />
              <span className="absolute h-2 w-2 rounded-full bg-gradient-to-br from-accent-blue to-accent-cyan shadow-[0_0_10px_rgba(91,140,255,0.9)]" />
            </span>
            <span className="font-serif text-lg leading-none text-white">
              Raihan<span className="text-white/40"> Basha</span>
            </span>
          </a>

          {/* Desktop links */}
          <ul className="hidden items-center gap-1 md:flex">
            {NAV_ITEMS.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="group relative rounded-lg px-2.5 py-2 text-[13px] text-white/60 transition-colors hover:text-white lg:px-3.5"
                >
                  {item.label}
                  <span className="absolute inset-x-3 -bottom-px h-px scale-x-0 bg-gradient-to-r from-accent-blue to-accent-cyan transition-transform duration-300 group-hover:scale-x-100" />
                </a>
              </li>
            ))}
          </ul>

          {/* Right actions */}
          <div className="flex items-center gap-2">
            <MagneticButton
              href="/Resume_2026.pdf"
              ariaLabel="Download resume"
              className="hidden rounded-xl border border-hairline bg-white/[0.03] px-3 py-2 text-sm text-white/70 transition-colors hover:bg-white/[0.07] hover:text-white sm:inline-flex"
            >
              <FileText className="h-4 w-4" />
              <span className="hidden lg:inline">Resume</span>
            </MagneticButton>
            <MagneticButton
              href="#contact"
              ariaLabel="Contact"
              className="rounded-xl bg-gradient-to-r from-accent-blue to-accent-violet px-4 py-2 text-sm font-medium text-white shadow-[0_4px_20px_rgba(91,140,255,0.35)] transition-shadow hover:shadow-[0_6px_28px_rgba(91,140,255,0.5)]"
            >
              Contact
            </MagneticButton>
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-label="Toggle menu"
              aria-expanded={open}
              className="grid h-10 w-10 place-items-center rounded-xl border border-hairline bg-white/[0.03] text-white/80 md:hidden"
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </nav>
      </motion.header>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-40 md:hidden"
          >
            <div className="absolute inset-0 bg-ink-950/70 backdrop-blur-md" onClick={() => setOpen(false)} />
            <motion.nav
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="glass-strong absolute left-4 right-4 top-24 rounded-2xl p-4"
            >
              <ul className="flex flex-col">
                {NAV_ITEMS.map((item, i) => (
                  <motion.li
                    key={item.href}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 * i }}
                  >
                    <a
                      href={item.href}
                      onClick={() => setOpen(false)}
                      className="flex items-center justify-between rounded-xl px-4 py-3 text-base text-white/75 transition-colors hover:bg-white/[0.05] hover:text-white"
                    >
                      {item.label}
                      <span className="text-white/20">↗</span>
                    </a>
                  </motion.li>
                ))}
              </ul>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
