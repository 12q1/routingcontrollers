// src/pages/controller.ts
import { JsonController, Get, Param, Body, Put, NotFoundError, Post, HttpCode } from 'routing-controllers'
import Page from './entity'

@JsonController()
export default class PageController {

    @Get('/pages/:id')
    getPage(
        @Param('id') id: number
        ) {
        return Page.findOne(id)
    }//end of @Get

    @Get('/pages')
    async allPages() {
        const pages = await Page.find()
    return { pages }
    }//end of @Get

    @Put('/pages/:id')
    async updatePage(
    @Param('id') id: number,
    @Body() update: Partial<Page>
    ) {
    const page = await Page.findOne(id)
    if (!page) throw new NotFoundError('Cannot find page')

    return Page.merge(page, update).save()
    }//end of @Put

    @Post('/pages')
    @HttpCode(201)
    createPage(
    @Body() page: Page
    ) {
    return page.save()
    }

}

//     @Get('/pages')
//     allPages(): PageList {
//       return {
//         pages: Object.keys(pagesById).map(key => pagesById[key])
//       };
//     }

//     @Put('/pages/:id')
//     updatePage(
//         @Param('id') id: number,
//         @Body() body: Partial<Page>
//     ): Page {
//     console.log(`Incoming PUT body param:`, body)
//     return pagesById[id]
//     }

//     @Post('/pages')
//     @HttpCode(201)
//     createPage(
//         @Body() body: Page
//     ): Page {
//         console.log(`Incoming POST body param:`, body)
//         return body
// }
