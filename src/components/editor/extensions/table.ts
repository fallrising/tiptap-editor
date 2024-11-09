import { Table } from '@tiptap/extension-table'
import { TableRow } from '@tiptap/extension-table-row'
import { TableHeader } from '@tiptap/extension-table-header'
import { TableCell } from '@tiptap/extension-table-cell'

export const tableExtensions = [
    Table.configure({
        resizable: true,
        HTMLAttributes: {
            class: 'border-collapse table-auto w-full',
        },
    }),
    TableRow.configure({
        HTMLAttributes: {
            class: 'border-b border-gray-200',
        },
    }),
    TableHeader.configure({
        HTMLAttributes: {
            class: 'border-b-2 border-gray-300 bg-gray-100 font-bold',
        },
    }),
    TableCell.configure({
        HTMLAttributes: {
            class: 'border border-gray-200 p-2',
        },
    }),
];