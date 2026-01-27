"use client";

import { Section } from "@/components/ui/Section";
import { Input, Textarea } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";
import { useState } from "react";
import { FaLinkedin, FaInstagram, FaGithub } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

export function Contact() {
    const [formData, setFormData] = useState({ name: "", email: "", message: "" });
    const [status, setStatus] = useState("idle"); // idle, loading, success, error
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus("loading");

        try {
            const res = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            if (res.ok) {
                setStatus("success");
                setIsModalOpen(true);
                setFormData({ name: "", email: "", message: "" });
            } else {
                const data = await res.json();
                console.error("Form Submission Error:", data);
                setStatus("error");
                alert("Something went wrong. Please check console for details.");
            }
        } catch (error) {
            console.error(error);
            setStatus("error");
            alert("Failed to send message.");
        } finally {
            setStatus("idle");
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const socialLinks = [
        { name: "LinkedIn", href: "https://linkedin.com/in/channabasumathad", icon: FaLinkedin },
        { name: "X (Twitter)", href: "https://x.com/Channabasu34", icon: FaXTwitter },
        { name: "Instagram", href: "https://instagram.com/channabasu_mathad/", icon: FaInstagram },
        { name: "GitHub", href: "https://github.com/channabasu2007", icon: FaGithub },
    ];

    return (
        <>
            <Section id="contact" borderTop className="mb-12">
                <div className="grid grid-cols-1 gap-8">
                    <div className="w-full text-center mb-8">
                        <h2 className="text-xs font-semibold text-text-light dark:text-neutral-400 uppercase tracking-widest mb-4">
                            Contact
                        </h2>
                        <p className="text-text-muted text-lg font-light leading-relaxed max-w-lg mx-auto">
                            Have a project in mind or want to discuss the future of tech? Send me
                            a message below.
                        </p>
                    </div>
                    <div className="w-full">
                        <form onSubmit={handleSubmit} className="w-full space-y-4 max-w-lg mx-auto">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="group">
                                    <label className="sr-only" htmlFor="name">Name</label>
                                    <Input
                                        id="name"
                                        name="name"
                                        placeholder="Name"
                                        type="text"
                                        required
                                        value={formData.name}
                                        onChange={handleChange}
                                        disabled={status === "loading"}
                                    />
                                </div>
                                <div className="group">
                                    <label className="sr-only" htmlFor="email">Email</label>
                                    <Input
                                        id="email"
                                        name="email"
                                        placeholder="Email Address"
                                        type="email"
                                        required
                                        value={formData.email}
                                        onChange={handleChange}
                                        disabled={status === "loading"}
                                    />
                                </div>
                            </div>
                            <div className="group">
                                <label className="sr-only" htmlFor="message">Message</label>
                                <Textarea
                                    id="message"
                                    name="message"
                                    placeholder="How can I help you?"
                                    required
                                    value={formData.message}
                                    onChange={handleChange}
                                    disabled={status === "loading"}
                                    rows={4}
                                />
                            </div>
                            <div className="flex justify-center pt-4">
                                <Button type="submit" disabled={status === "loading"}>
                                    {status === "loading" ? "Sending..." : "Send Message"}
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            </Section>

            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title="Message Sent"
                footer={
                    <Button onClick={() => setIsModalOpen(false)} className="w-full justify-center">
                        Close
                    </Button>
                }
            >
                <div className="text-center space-y-6">
                    <p className="text-text-muted">
                        Thank you for reaching out! In the meantime, feel free to connect with me on social media.
                    </p>
                    <div className="flex justify-center gap-6">
                        {socialLinks.map((link) => (
                            <a
                                key={link.name}
                                href={link.href}
                                target="_blank"
                                rel="noreferrer"
                                className="text-2xl text-text-muted hover:text-primary-dark transition-colors"
                                aria-label={link.name}
                            >
                                <link.icon />
                            </a>
                        ))}
                    </div>
                </div>
            </Modal>
        </>
    );
}
