import { MediaBlock } from '@/blocks/MediaBlock/Component'
import {
  DefaultNodeTypes,
  SerializedBlockNode,
  SerializedLinkNode,
  type DefaultTypedEditorState,
} from '@payloadcms/richtext-lexical'
import {
  JSXConvertersFunction,
  LinkJSXConverter,
  RichText as ConvertRichText,
} from '@payloadcms/richtext-lexical/react'

import { CodeBlock, CodeBlockProps } from '@/blocks/Code/Component'

import type {
  BannerBlock as BannerBlockProps,
  CallToActionBlock as CTABlockProps,
  MediaBlock as MediaBlockProps,
} from '@/payload-types'
import { BannerBlock } from '@/blocks/Banner/Component'
import { CallToActionBlock } from '@/blocks/CallToAction/Component'
import { cn } from '@/utilities/ui'

type NodeTypes =
  | DefaultNodeTypes
  | SerializedBlockNode<CTABlockProps | MediaBlockProps | BannerBlockProps | CodeBlockProps>

const internalDocToHref = ({ linkNode }: { linkNode: SerializedLinkNode }) => {
  const { value, relationTo } = linkNode.fields.doc!
  if (typeof value !== 'object') {
    throw new Error('Expected value to be an object')
  }
  const slug = value.slug
  return relationTo === 'posts' ? `/posts/${slug}` : `/${slug}`
}

const jsxConverters: JSXConvertersFunction<NodeTypes> = ({ defaultConverters }) => ({
  ...defaultConverters,
  ...LinkJSXConverter({ internalDocToHref }),
  blocks: {
    banner: ({ node }) => <BannerBlock className="col-start-2 mb-4" {...node.fields} />,
    mediaBlock: ({ node }) => (
      <MediaBlock
        className="col-start-1 col-span-3"
        imgClassName="m-0"
        {...node.fields}
        captionClassName="mx-auto max-w-[48rem]"
        enableGutter={false}
        disableInnerContainer={true}
      />
    ),
    code: ({ node }) => <CodeBlock className="col-start-2" {...node.fields} />,
    cta: ({ node }) => <CallToActionBlock {...node.fields} />,
  },
})

type Props = {
  data: DefaultTypedEditorState
  enableGutter?: boolean
  enableProse?: boolean
} & React.HTMLAttributes<HTMLDivElement>

export default function RichText(props: Props) {
  const { className, enableProse = true, enableGutter = true, ...rest } = props
  return (
    <ConvertRichText
      converters={jsxConverters}
      className={cn(
        'payload-richtext content-rich-text',
        {
          container: enableGutter,
          'max-w-none': !enableGutter,
          // Enhanced prose styling with Smart Age Tech design system
          'mx-auto prose prose-lg md:prose-xl dark:prose-invert max-w-none': enableProse,
          // Typography enhancements
          'prose-headings:font-geist prose-headings:font-semibold prose-headings:tracking-tight prose-headings:text-foreground prose-headings:scroll-mt-20':
            enableProse,
          // Heading hierarchy with proper spacing
          'prose-h1:text-display-md prose-h1:font-bold prose-h1:leading-tight prose-h1:mb-6 prose-h1:mt-8 first:prose-h1:mt-0':
            enableProse,
          'prose-h2:text-display-sm prose-h2:font-semibold prose-h2:leading-tight prose-h2:mb-4 prose-h2:mt-8 first:prose-h2:mt-0':
            enableProse,
          'prose-h3:heading-3 prose-h3:mb-4 prose-h3:mt-6 first:prose-h3:mt-0': enableProse,
          'prose-h4:heading-4 prose-h4:mb-3 prose-h4:mt-6 first:prose-h4:mt-0': enableProse,
          'prose-h5:heading-5 prose-h5:mb-3 prose-h5:mt-4 first:prose-h5:mt-0': enableProse,
          'prose-h6:heading-6 prose-h6:mb-2 prose-h6:mt-4 first:prose-h6:mt-0': enableProse,
          // Paragraph and text styling
          'prose-p:text-foreground prose-p:leading-relaxed prose-p:mb-4 prose-p:text-base md:prose-p:text-lg':
            enableProse,
          'prose-lead:text-lead prose-lead:mb-6': enableProse,
          // Enhanced text elements
          'prose-strong:text-foreground prose-strong:font-semibold': enableProse,
          'prose-em:text-muted-foreground prose-em:italic': enableProse,
          // Link styling with teal theme
          'prose-a:text-primary prose-a:font-medium prose-a:no-underline prose-a:transition-colors prose-a:duration-200':
            enableProse,
          'hover:prose-a:text-accent hover:prose-a:underline prose-a:underline-offset-4':
            enableProse,
          'focus-visible:prose-a:outline-2 focus-visible:prose-a:outline-ring focus-visible:prose-a:outline-offset-2':
            enableProse,
          // Enhanced blockquote styling
          'prose-blockquote:border-l-4 prose-blockquote:border-primary prose-blockquote:bg-muted/30 prose-blockquote:text-muted-foreground':
            enableProse,
          'prose-blockquote:not-italic prose-blockquote:font-normal prose-blockquote:pl-6 prose-blockquote:py-4 prose-blockquote:my-6':
            enableProse,
          'prose-blockquote:rounded-r-lg prose-blockquote:shadow-sm': enableProse,
          // Code styling with teal accents
          'prose-code:text-accent prose-code:bg-muted prose-code:px-2 prose-code:py-1 prose-code:rounded-md':
            enableProse,
          'prose-code:text-sm prose-code:font-mono prose-code:font-medium prose-code:before:content-none prose-code:after:content-none':
            enableProse,
          // Pre-formatted code blocks
          'prose-pre:bg-muted prose-pre:border prose-pre:border-border prose-pre:rounded-lg prose-pre:p-4':
            enableProse,
          'prose-pre:overflow-x-auto prose-pre:text-sm prose-pre:leading-relaxed prose-pre:my-6':
            enableProse,
          'prose-pre:shadow-sm prose-pre:font-mono': enableProse,
          // List styling
          'prose-ul:text-foreground prose-ul:my-4 prose-ul:pl-6': enableProse,
          'prose-ol:text-foreground prose-ol:my-4 prose-ol:pl-6': enableProse,
          'prose-li:text-foreground prose-li:leading-relaxed prose-li:mb-2': enableProse,
          'prose-li:marker:text-primary': enableProse,
          // Table styling
          'prose-table:border-collapse prose-table:border prose-table:border-border prose-table:rounded-lg prose-table:overflow-hidden':
            enableProse,
          'prose-thead:bg-muted prose-th:border prose-th:border-border prose-th:px-4 prose-th:py-3 prose-th:text-left prose-th:font-semibold':
            enableProse,
          'prose-td:border prose-td:border-border prose-td:px-4 prose-td:py-3': enableProse,
          'prose-tbody:prose-tr:border-b prose-tbody:prose-tr:border-border': enableProse,
          // Image styling
          'prose-img:rounded-lg prose-img:shadow-md prose-img:my-6': enableProse,
          // HR styling
          'prose-hr:border-border prose-hr:my-8': enableProse,
          // RTL support
          '[dir="rtl"]:prose-blockquote:border-l-0 [dir="rtl"]:prose-blockquote:border-r-4 [dir="rtl"]:prose-blockquote:pl-0 [dir="rtl"]:prose-blockquote:pr-6':
            enableProse,
          '[dir="rtl"]:prose-ul:pl-0 [dir="rtl"]:prose-ul:pr-6 [dir="rtl"]:prose-ol:pl-0 [dir="rtl"]:prose-ol:pr-6':
            enableProse,
          '[dir="rtl"]:prose-th:text-right [dir="rtl"]:prose-td:text-right': enableProse,
        },
        className,
      )}
      {...rest}
    />
  )
}
