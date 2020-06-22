let router = [
    //党建联盟
    {
        path: '/party',
        component: () =>
            import ('../../views/party_alliance/alliance_activity/party.vue'),

    }, {
        path: '/party_active_detail',
        component: () =>
            import ('../../views/party_alliance/alliance_activity/party_active_detail.vue'),
    }, {
        path: '/create_active',
        component: () =>
            import ('../../views/party_alliance/alliance_activity/create_active.vue'),
    }, {
        path: '/people_list',
        component: () =>
            import ('../../views/party_alliance/alliance_activity/people_list.vue'),
    }, {
        path: '/service_need_list',
        component: () =>
            import ('../../views/party_alliance/service_needs/list.vue'),
    }, {
        path: '/create_needs',
        component: () =>
            import ('../../views/party_alliance/service_needs/create_needs.vue'),
    }, {
        path: '/needs_detail',
        component: () =>
            import ('../../views/party_alliance/service_needs/needs_detail.vue'),
    },
    //民主评议
    {
        path: '/democratic_comment',
        component: () =>
            import ('../../views/organizationManagement/democratic_comment.vue'),
    },
    {
        path: '/comment_issue',
        component: () =>
            import ('../../views/organizationManagement/comment_issue.vue'),
    },
    {
        path: '/choose_range',
        component: () =>
            import ('../../views/organizationManagement/choose_range.vue'),
    },
    {
        path: '/comment_detail',
        component: () =>
            import ('../../views/organizationManagement/comment_detail.vue'),
    },
//    在线学习
    {
        path: '/exam_list',
        component: () =>
            import ('../../views/onlineExam/exam_list.vue'),
    },
    {
        path: '/plan_exam',
        component: () =>
            import ('../../views/onlineExam/plan_exam.vue'),
    },
    {
        path: '/examing',
        component: () =>
            import ('../../views/onlineExam/examing.vue'),
    },
    {
        path: '/end_exam',
        name:'end_exam',
        component: () =>
            import ('../../views/onlineExam/end_exam.vue'),
    },
    {
        path: '/error_list',
        name:'error_list',
        component: () =>
            import ('../../views/onlineExam/error_list.vue'),
    },
    {
        path: '/exam_manage',
        name:'exam_manage',
        component: () =>
            import ('../../views/onlineExam/exam_manage.vue'),
    },
    {
        path: '/exam_manage_detail',
        name:'exam_manage_detail',
        component: () =>
            import ('../../views/onlineExam/exam_manage_detail.vue'),
    },
//    党建相册
    {
        path: '/party_photo',
        name:'photo_list',
        component: () =>
            import ('../../views/partyPhoto/list.vue'),
    },
    {
        path: '/update_img',
        name:'update_img',
        component: () =>
            import ('../../views/partyPhoto/update_img.vue'),
    },
    {
        path: '/create_photo',
        name:'create_photo',
        component: () =>
            import ('../../views/partyPhoto/create_photo.vue'),
    },
];
export default router