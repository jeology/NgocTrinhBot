exports.run = (bot, message, args) => {
        switch(args[0]) {
            // !ping
            case 'ngoctrinh':
                message.channel.send("Xin chào mấy anh, em tên là Ngọc Trinh, xin hân hạnh được phục vụ mấy anh ạ!");
                break;
            // Just add any case commands if you want to..
            case 'HDZ':
                message.channel.send("A Huy đẹp zai, đi rừng mệt hông? Vào phòng em massage cho. Ahihi!");
                break;
            //
            case 'Be':
                message.channel.send("Đi tàu nhanh không anh? Anh bắn AD hay quá, anh bắn vô trong em luôn đi <3");
                break;
            //
            case 'OGasianDaddy':
                message.channel.send("Em đừng đụng vào anh Phúc của chị nha! Không là chị tát em đó.");
                break;
            //
            case 'phuck':
                message.channel.send("Anh Phúc đẹp zai chuối to qua nhà xem Netflix với em nha!");
                break;
            //
            case 'Teddy':
                message.channel.send("Cặc");
                break;
            //
            default:
                message.channel.send("Không có nha mấy anh. Tìm lại đi bé thưởng");
                break;
         }
}
