import { Link } from '@tiptap/extension-link';

export const linkExtension = Link.configure({
    openOnClick: false, // Disable default link clicking behavior
    HTMLAttributes: {
        class: 'text-blue-600 hover:text-blue-800 hover:underline cursor-pointer',
        rel: 'noopener noreferrer nofollow', // Security best practice for external links
    },
    validate: href => /^https?:\/\//.test(href), // Ensure links have http/https protocol
});